import { NzMarks } from 'ng-zorro-antd/slider';

export interface SliderComponentConfig {
  readonly?: boolean;
  dualMode?: boolean;
  minRange?: number;
  maxRange?: number;
  marks?: NzMarks;
  step?: number;
  cssStyle?: { [key: string]: any };
  cssClass?: string;
}
