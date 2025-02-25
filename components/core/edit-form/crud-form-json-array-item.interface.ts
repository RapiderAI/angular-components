import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormJsonArrayItem extends CrudFormItem {
  previewFieldNames?: string[];
}
