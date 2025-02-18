import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormInputTemplateItem extends CrudFormItem {
  showCodemirrorForObjectAndArray: boolean;
  typeAndFormat: any;
  isInputOptionsVisible?: boolean;
  config?: any;
}
