import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextboxComponentConfig } from '@rapider/angular-components/textbox';
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
