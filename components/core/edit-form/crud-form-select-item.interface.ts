import { ButtonComponentConfig } from '../button';
import { SelectableOption } from '../form-utils/selectable-option.type';
import { GrouppedOption } from '../select/groupped-option.interface';
import { OptionMode } from '../select/select-option-mode.enum';
import { SelectSettings } from '../select/select-settings.interface';
import { InputSize } from '../shared';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormSelectItem extends CrudFormItem {
  size?: InputSize;
  settings?: SelectSettings;
  options: SelectableOption[];
  grouppedOptions?: GrouppedOption[];
  invalidConfigText?: string;
  disabled?: boolean;
  buttons?: ButtonComponentConfig[];
  optionMode?: OptionMode;
}
