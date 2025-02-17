import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormLabelItem extends CrudFormItem {
  hideWhenNoValue?: boolean;
}
