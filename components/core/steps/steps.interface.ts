import { IconComponentConfig } from "@rapider/angular-components/icon";

export interface Step {
  description?: string;
  icon?: IconComponentConfig;
  status?: StepStatus;
  title: string;
  subTitle?: string;
  disabled?: boolean;
  percentage?: number;
}

export enum StepStatus {
  Wait = 'wait',
  Process = 'process',
  Finish = 'finish',
  Error = 'error'
}
