import { CardListItem } from '@rapider/angular-components/card-list';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormListItem extends CrudFormItem {
  list?: CardListItem[];
}
