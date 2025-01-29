import { IconComponentConfig } from "@rapider/angular-components/icon";
import { StepStatus } from "./step-status.enum";

export interface Step {
  description?: string;
  icon?: IconComponentConfig;
  status?: StepStatus;
  title: string;
  subTitle?: string;
  disabled?: boolean;
  percentage?: number;
}