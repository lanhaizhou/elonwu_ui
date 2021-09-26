import React, { useCallback, useEffect, useState } from 'react';
import DataSet from '@antv/data-set';

import { Chart, colors20 } from './base';

import { isNil, Request, getLocal, setLocal } from '@elonwu/utils';
import { useApi } from '@elonwu/hooks';

// 获取 g2 的地图绘制 json
const gwApi = new Request(
  'https://gw.alipayobjects.com',
  {
    onSuccess: (data) => data,
  },
  { withCredentials: false },
);

const getMapData = () => gwApi.get('/os/antvdemo/assets/data/world.geo.json');

export const Map = React.forwardRef(
  ({ chartKey, mainKey, tooltipKeys, ...props }, ref) => {
    const { data: mapData } = useApi(
      getMapData,
      {},
      {
        dedupingInterval: 1000 * 60 * 60 * 24, // 24 小时内复用数据
      },
    );

    // 渲染配置
    const configChart = useCallback(
      async ({ chart, source }) => {
        if (isNil(mapData)) return;

        const ds = new DataSet();

        // 图表基础配置
        chart.scale({
          x: { sync: true },
          y: { sync: true },
        });
        chart.coordinate('rect').reflect('y');
        chart.legend(false);
        chart.axis(false);

        // tooltip
        chart.tooltip({
          showTitle: false,
          shared: true,
          showMarkers: false,
          containerTpl:
            '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
          itemTpl:
            '<tr data-index="{index}"><td style="padding:5px;background-color:#545454;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
          domStyles: {
            'g2-tooltip': {
              borderRadius: '2px',
              backgroundColor: '#DDDDDD',
              padding: 0,
              border: '1px solid #333333',
            },
          },
        });

        // 绘制地图背景
        const dv = ds
          .createView('back')
          .source(mapData, {
            type: 'GeoJSON',
          })
          .transform({
            type: 'geo.projection',
            projection: 'geoMercator',
            as: ['x', 'y', 'centroidX', 'centroidY'],
          });
        const bgView = chart.createView();
        bgView.data(dv.rows);
        bgView.tooltip(false);
        bgView.polygon().position('x*y').style({
          fill: colors20[23],
          stroke: colors20[0],
          lineWidth: 0.4,
          fillOpacity: 0.75,
        });

        // 绘制数据
        const userData = ds.createView().source(source);

        userData.transform({
          type: 'map',
          callback: (obj) => {
            const projectedCoord = dv.geoProjectPosition(
              [obj.lng * 1, obj.lat * 1],
              'geoMercator',
            );
            obj.x = projectedCoord[0];
            obj.y = projectedCoord[1];
            return obj;
          },
        });

        const pointView = chart.createView();
        pointView.data(userData.rows);
        // 设定 tooptip
        pointView
          .point()
          .position('x*y')
          .size(mainKey, [10, 20])
          .shape('circle')
          .color(colors20[1])
          .tooltip(tooltipKeys.join('*'))
          .style({
            fillOpacity: 0.45,
          })
          .state({
            active: {
              style: {
                lineWidth: 1,
                stroke: colors20[2],
              },
            },
          });
        pointView.interaction('element-active');
      },
      [mapData, mainKey, tooltipKeys],
    );

    return (
      <Chart
        ref={ref}
        chartKey={`Line-${chartKey}`}
        configChart={configChart}
        {...props}
      />
    );
  },
);
