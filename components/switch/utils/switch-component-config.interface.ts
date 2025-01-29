import { IconComponentConfig } from '@rapider/angular-components/icon';
import { SwitchSize } from '@rapider/angular-components/core/switch';

export interface SwitchComponentConfig {
  disabled?: boolean;
  loading?: boolean;
  size?: SwitchSize;
  text?: string;
  defaultValue?: boolean;
  textPosition?: string;
  tooltipText?: string;
  icon?: IconComponentConfig;
  checkedChildren?: string;
  unCheckedChildren?: string;
}
