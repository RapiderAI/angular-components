import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextComponentConfig } from  '@rapider/angular-components/text';
import { CheckboxType } from  '@rapider/angular-components/core/checkbox';

export interface CheckboxList {
  value: string;
  key?: TextComponentConfig;
  cssStyle?: { [key: string]: any };
  cssClass?: string;
  disabled?: boolean;
  checkboxType?: CheckboxType;
  icon?: IconComponentConfig;
  tooltip?: string;
  additionalIcon?: IconComponentConfig;
  isSelected?: boolean;
}
