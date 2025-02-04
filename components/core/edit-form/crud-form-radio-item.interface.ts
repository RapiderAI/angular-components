import { InputSize } from '../';
import { SelectableOption } from '../form-utils';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormRadioItem extends CrudFormItem {
  size?: InputSize;
  options: SelectableOption[];
  invalidConfigText?: string;
}
