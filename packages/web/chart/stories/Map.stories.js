import React from 'react';
import { Map } from '../src';

export default {
  title: 'Components/Chart/Map',
  component: Map,
};

export const MapByRegionStory = () => (
  <Map
    chartKey="Story-Map-ByRegion-China"
    height={500}
    locateType="REGION"
    // locateType="LNGLAT"
    mapType="china-provinces"
    dataSource={[
      // {
      //   date: '1902/12/16',
      //   location: 'Andijon (Andizhan), Uzbekistan (Turkestan, Russia)',
      //   lat: '40.8',
      //   lng: '72.3',
      //   live: 4700,
      //   magnitude: '6.4',
      // },
      { region: 'Beijing', value: 86.8 },
      { region: 'Shanghai', value: 86.8 },

      { region: 'China', value: 106.3 },
      { region: 'Japan', value: 94.7 },
      { region: 'Mongolia', value: 98 },
      { region: 'Canada', value: 98.4 },
      { region: 'United Kingdom', value: 97.2 },
      { region: 'United States of America', value: 98.3 },
      { region: 'Brazil', value: 96.7 },
      { region: 'Argentina', value: 95.8 },
      { region: 'Algeria', value: 101.3 },
      { region: 'France', value: 94.8 },
      { region: 'Germany', value: 96.6 },
      { region: 'Ukraine', value: 86.3 },
      { region: 'Egypt', value: 102.1 },
      { region: 'South Africa', value: 101.3 },
      { region: 'India', value: 107.6 },
      { region: 'Australia', value: 99.9 },
      { region: 'Saudi Arabia', value: 130.1 },
      { region: 'Afghanistan', value: 106.5 },
      { region: 'Kazakhstan', value: 93.4 },
      { region: 'Indonesia', value: 101.4 },
    ]}
    renderDataView={({ chart, dataView, source }) => {
      // 可视化用户数据
      dataView.transform({
        type: 'map',
        callback: (obj) => {
          obj.trend = obj.value > 100 ? '男性更多' : '女性更多';
          return obj;
        },
      });

      const userView = chart.createView();
      userView.data(dataView.rows);
      userView.scale({
        trend: {
          alias: '每100位女性对应的男性数量',
        },
      });
      userView
        .polygon()
        .position('x*y')
        .color('trend', ['#F51D27', '#0A61D7'])
        .tooltip('name*trend')
        .style({
          fillOpacity: 0.85,
        })
        .animate({
          leave: {
            animation: 'fade-out',
          },
        });
      userView.interaction('element-active');
    }}
  />
);

export const MapByLNGLATStory = () => (
  <Map
    chartKey="Story-Map-ByLNGLAT"
    height={500}
    mapType="world"
    locateType="LNGLAT"
    // 绘制数据
    dataSource={[
      {
        date: '1902/12/16',
        location: 'Andijon (Andizhan), Uzbekistan (Turkestan, Russia)',
        lat: '40.8',
        lng: '72.3',
        live: 4700,
        magnitude: '6.4',
      },
      {
        date: '1905/04/04',
        location: 'Kangra, India',
        lat: '33.0',
        lng: '76.0',
        live: 19000,
        magnitude: '7.5',
      },
    ]}
    renderDataView={({ chart, dataView, source }) => {
      const mainKey = 'live';
      const tooltipKeys = ['live', 'magnitude'];

      chart.legend({ position: 'right' });

      const pointView = chart.createView();
      pointView.data(dataView.rows);
      // 设定 tooptip
      pointView
        .point()
        .position('x*y')
        .size(mainKey, [10, 20])
        .shape('circle')
        .tooltip(tooltipKeys.join('*'))
        .style({
          fill: '#000',
          fillOpacity: 0.45,
        })
        .state({
          active: {
            style: {
              lineWidth: 1,
            },
          },
        });
      pointView.interaction('element-active');
    }}
  />
);
