import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormLabelFunctionItem extends CrudFormItem {
  functionToDisplay: Function;
}
