import React, { useCallback } from 'react';
import { NodeConfig } from '@antv/g6';
import { Graph, GraphProps, GraphRenderer } from './base';

export const Tree = React.forwardRef(
  ({ chartKey, ...rest }: GraphProps, ref) => {
    // 渲染配置
    const configChart = useCallback<GraphRenderer>(({ chart, source }) => {
      chart.clear();

      chart.node(function (node: NodeConfig) {
        let position = 'right';
        let rotate = 0;
        if (!node.children) {
          position = 'bottom';
          rotate = Math.PI / 2;
        }
        return {
          label: node.id,
          labelCfg: {
            position,
            offset: 5,
            style: {
              rotate,
              textAlign: 'start',
            },
          },
        };
      });

      chart.data(source);
    }, []);

    return (
      <Graph
        ref={ref}
        // @ts-ignore
        chartKey={`Tree-${chartKey}`}
        configChart={configChart}
        {...rest}
      />
    );
  },
);
