import React, { useEffect, useCallback } from 'react';
import G6, { NodeConfig, ModelConfig, IGroup } from '@antv/g6';
import { Graph, GraphProps, GraphRenderer } from './base';
import { colors20 } from '@elonwu/web-chart';

export const Tree = React.forwardRef(
  (
    {
      chartKey,
      activeNodes,
      ...rest
    }: GraphProps & { activeNodes: (string | null)[] },
    ref,
  ) => {
    useEffect(() => {
      G6.registerNode(
        'circle-animate',
        {
          // @ts-ignore
          afterDraw(cfg: ModelConfig, group: IGroup) {
            const shape = group.get('children')[0];
            shape.animate(
              (ratio: number) => {
                const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
                return {
                  r: (cfg?.size as number) / 2 + diff,
                };
              },
              {
                repeat: true,
                duration: 1200,
                easing: 'easeCubic',
              },
            );
          },
        },
        'circle',
      );
    }, []);

    // 渲染配置
    const configChart = useCallback<GraphRenderer>(
      ({ chart, source }) => {
        chart.clear();

        chart.node(function (node: NodeConfig) {
          const active = activeNodes.includes(node.id);

          const noChildren = !node.children;

          let position = 'right',
            rotate = 0;
          if (!noChildren) {
            position = 'bottom';
            rotate = Math.PI / 2;
          }

          const style = Object.assign(
            {
              shadowColor: '#00000030',
              shadowBlur: 16,
              shadowOffsetX: 8,
              shadowOffsetY: 8,
              cursor: 'pointer',
            },
            active
              ? {
                  stroke: colors20[1],
                  fill: colors20[21],
                  lineWidth: 2,
                  size: 24,
                  lineDash: [2, 2, 2, 2],
                }
              : {
                  stroke: colors20[0],
                  fill: colors20[20],
                  lineWidth: 2,
                  // lineDash: [2, 2, 2, 2],
                  size: 24,
                },
          );

          return Object.assign(node, {
            label: null,
            style,
            type: active ? 'circle-animate' : 'circle',
            size: 20,
            labelCfg: {
              position,
              offset: 5,
              style: {
                rotate,
                textAlign: 'start',
              },
            },
          });
        });

        chart.data(source);
      },
      [activeNodes],
    );

    return (
      <Graph
        ref={ref}
        // @ts-ignore
        chartKey={`Tree-${chartKey}`}
        configChart={configChart}
        defaultEdge={{
          type: 'cubic-vertical',
          size: 2,
          style: {
            stroke: colors20[20],
          },
        }}
        layout={{
          type: 'compactBox',
          // direction: 'TB', // H / V / LR / RL / TB / BT
          direction: 'TB', // H / V / LR / RL / TB / BT

          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 80;
          },
          getHGap: function getHGap() {
            return 20;
          },
        }}
        {...rest}
      />
    );
  },
);
