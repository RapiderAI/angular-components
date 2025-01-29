import { SwitchSize } from '../switch';
import { TextComponentConfig } from '../text';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormSwitchItem extends CrudFormItem {
  disabled?: boolean;
  loading?: boolean;
  text?: TextComponentConfig;
  size?: SwitchSize;
}
