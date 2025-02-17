import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormObjectItem extends CrudFormItem {
  /* items of the nested form */
  items?: CrudFormItem[];
  /* preview of the nested items' data informations */
  dataPreview?: string;
}
