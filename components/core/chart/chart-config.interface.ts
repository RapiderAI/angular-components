import { ChartType, ChartCoordinateType, ChartLabelPosition, ChartLegendPosition } from './chart-config.enum';

export interface ChartConfig {
  type: ChartType;
  autoFit?: boolean;
  data?: any[];
  encode?: { [key: string]: string };
  scale?: { [key: string]: any };
  transform?: { type: string;[key: string]: any }[];
  coordinate?: {
    type: ChartCoordinateType;
    outerRadius?: number;
    [key: string]: any;
  };
  legend?: {
    position: ChartLegendPosition;
    layout?: { justifyContent: string };
    [key: string]: any;
  };
  labels?: {
    position: ChartLabelPosition;
    text: (data: any) => string;
    [key: string]: any;
  }[];
  tooltip?: {
    items: ((data: any) => { name: string; value: string })[];
    [key: string]: any;
  };
  interactions?: { type: string;[key: string]: any }[];
  [key: string]: any;
}
