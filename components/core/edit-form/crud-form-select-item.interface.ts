import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { SelectableOption } from '@rapider/angular-components/core/form-utils';
import { GrouppedOption } from '@rapider/angular-components/core/select';
import { SelectOptionMode } from '@rapider/angular-components/core/select';
import { SelectSettings } from '@rapider/angular-components/core/select';
import { InputSize } from '@rapider/angular-components/core/style';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormSelectItem extends CrudFormItem {
  size?: InputSize;
  settings?: SelectSettings;
  options: SelectableOption[];
  grouppedOptions?: GrouppedOption[];
  invalidConfigText?: string;
  disabled?: boolean;
  buttons?: ButtonComponentConfig[];
  optionMode?: SelectOptionMode;
}
