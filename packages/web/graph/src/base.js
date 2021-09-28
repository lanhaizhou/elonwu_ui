import React, { useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import G6 from '@antv/g6';

// components
import { Empty } from '@elonwu/web-empty';
// import { Loading } from '@elonwu/web-loading';

// utils
import { isValidArray, isFunction, isArray } from '@elonwu/utils';

// 初始化 chart 对象
const useChart = ({ chartKey, events = {}, dataSource, ...rest }) => {
  // 图表实例
  const chartRef = useRef();

  // 初始化
  useLayoutEffect(() => {
    const chart = new G6.TreeGraph({
      container: `Graph-${chartKey}`,
      linkCenter: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model');
              data.collapsed = collapsed;
              return true;
            },
          },
          // 'drag-canvas',
          // 'zoom-canvas',
        ],
      },
      // defaultNode: {
      //   size: 26,
      //   anchorPoints: [
      //     [0, 0.5],
      //     [1, 0.5],
      //   ],
      // },
      // defaultEdge: {
      //   type: 'cubic-vertical',
      // },
      layout: {
        type: 'dendrogram',
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 40,
        rankSep: 100,
      },
      ...rest,
    });
    chartRef.current = chart;
  }, []);

  // 事件绑定
  useEffect(() => {
    const chart = chartRef?.current;

    if (!chart) return;

    // 事件绑定
    const eventKeys = Object.keys(events);

    if (isValidArray(eventKeys)) {
      eventKeys.forEach((eventKey) => {
        const callback = events[eventKey];
        // console.log(`attaching ${eventKey}`);
        if (isFunction(callback)) chart.on(eventKey, callback);
      });
    }

    // 事件解绑
    return () => {
      if (isValidArray(eventKeys)) {
        eventKeys.forEach((eventKey) => {
          const callback = events[eventKey];
          if (isFunction(callback)) chart.off(eventKey, callback);
        });
      }
    };
  }, [events]);

  return chartRef;
};

// chart 动态配置
const useChartUpdate = ({ chartRef, source, setConfig, configChart }) => {
  useEffect(() => {
    const chart = chartRef?.current;
    if (!chart) return;

    const onUpdate = async () => {
      // 预设的图表配置， 如 LineEnhance
      if (isFunction(configChart)) await configChart({ chart, source });
      // 消费组件时 定义配置项
      if (isFunction(setConfig)) await setConfig({ chart, source });

      chart.render();
      chart.fitView();
    };

    onUpdate();
  }, [chartRef, source, configChart]);
};

// dom 渲染 chart
export const Graph = React.forwardRef(
  (
    {
      chartKey,
      loading,
      dataSource,

      configChart,
      overrideConfigChart,
      setConfig,

      events = {},
      width = 320,
      height = 320,
    },
    ref,
  ) => {
    // 格式化 source
    const source = useMemo(
      () =>
        isValidArray(dataSource) || isValidArray(Object.keys(dataSource))
          ? dataSource
          : [],
      [dataSource],
    );

    // 加载完成且数据为空
    const empty = useMemo(
      () => !loading && isArray(source) && !isValidArray(source),
      [loading, source],
    );

    // 图表实例
    const chartRef = useChart({
      chartKey,
      events,
      dataSource,
      height,
      width,
    });

    // 更新渲染
    useChartUpdate({
      chartRef,
      source,
      configChart: overrideConfigChart || configChart,
      setConfig,
    });

    // 实际渲染的 DOM
    return (
      <div style={{ position: 'relative' }} ref={ref}>
        {/* loading */}
        {/* {loading && (
          <Loading
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          />
        )} */}

        {/* empty */}
        {empty && (
          <Empty
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          />
        )}

        {/* chart */}
        <div
          id={`Graph-${chartKey}`}
          ref={ref}
          style={{
            display: 'grid',
            placeitems: 'center',
            height,
            width,
            opacity: empty ? 0 : 1,
          }}
        />
      </div>
    );
  },
);
