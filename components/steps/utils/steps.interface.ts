import { IconComponentConfig } from "@rapider/angular-components/icon";
import { StepStatus } from "@rapider/angular-components/core/steps";

export interface Steps {
  description?: string;
  icon?: IconComponentConfig;
  status?: StepStatus;
  title: string;
  subTitle?: string;
  disabled?: boolean;
  percentage?: number;
}
