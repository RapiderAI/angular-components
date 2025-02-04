import { InputSize } from '@rapider/angular-components/core/style';
import { SelectableOption } from '@rapider/angular-components/core/form-utils';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormRadioItem extends CrudFormItem {
  size?: InputSize;
  options: SelectableOption[];
  invalidConfigText?: string;
}
