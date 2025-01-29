import { TextComponentConfig } from '../text/text-component-config.interface';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormStringArrayItem extends CrudFormItem {
  orderable?: boolean;
  orderNumbersVisibility?: boolean;
  infoMessage?: TextComponentConfig;
}
