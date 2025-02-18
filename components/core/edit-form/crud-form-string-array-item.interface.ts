import { TextComponentConfig } from '@rapider/angular-components/text';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormStringArrayItem extends CrudFormItem {
  orderable?: boolean;
  orderNumbersVisibility?: boolean;
  infoMessage?: TextComponentConfig;
}
