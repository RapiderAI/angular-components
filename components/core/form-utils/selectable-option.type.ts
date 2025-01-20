import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';

export interface SelectableOption {
  key: string;
  value: any;
  icon?: IconComponentConfig;
}

export interface SelectableOptionWithTooltip extends SelectableOption {
  tooltipText?: string;
}