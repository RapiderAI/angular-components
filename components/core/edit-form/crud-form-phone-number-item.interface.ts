import { InputSize } from '../shared/input-size/input-size.enum';
import { SelectComponentConfig } from '../select';
import { TextBoxType } from '../textbox/textbox-type.enum';
import { CrudFormItem } from './crud-form-item.interface';
import { TextboxComponentConfig } from '../textbox';

export interface CrudFormPhoneNumberItem extends CrudFormItem {
  mask?: string;
  maskGuide?: boolean;
  textType?: TextBoxType;
  size?: InputSize;
  disabled?: boolean;
  autoFocus?: boolean;
  selectConfig?: SelectComponentConfig;
  textboxConfig?: TextboxComponentConfig;
}
