import { Action } from '@rapider/angular-components/core/utils';
import { InputSize } from '@rapider/angular-components/core/style';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormButtonItem extends CrudFormItem, Action {
  size?: InputSize;
}
