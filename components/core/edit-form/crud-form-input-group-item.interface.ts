import { ButtonComponentConfig } from '../button';
import { IconComponentConfig } from '../icon';
import { TextboxComponentConfig } from '../textbox';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormInputGroupItem extends CrudFormItem {
  prefixIcon?: IconComponentConfig;
  suffixIcon?: IconComponentConfig;
  prefixButton?: ButtonComponentConfig;
  suffixButton?: ButtonComponentConfig;
  textbox?: TextboxComponentConfig;
  prefixText?: string;
  suffixText?: string;
}
