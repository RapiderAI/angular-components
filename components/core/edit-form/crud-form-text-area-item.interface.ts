import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormTextAreaItem extends CrudFormItem {
  autosize: boolean;
  minLength?: number;
}
