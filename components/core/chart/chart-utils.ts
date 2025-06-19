import { ChartConfig } from './chart-config.interface';
import { G2Spec } from '@antv/g2';

export function convertChartConfigToG2Spec(config: ChartConfig): G2Spec {
  return {
    ...config,
    transform: config.transform?.map((t) => ({
      ...t,
      type: t.type === 'stackY' ? 'stackY' : 'filter',
    })),
  } as G2Spec;
}
