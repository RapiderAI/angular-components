import { SwitchSize } from '@rapider/angular-components/core/switch';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormSwitchItem extends CrudFormItem {
  disabled?: boolean;
  loading?: boolean;
  text?: TextComponentConfig;
  size?: SwitchSize;
}
