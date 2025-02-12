import { CardListItem } from '@rapider/angular-components/core/card';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormListItem extends CrudFormItem {
  list?: CardListItem[];
}
