import { InputSize } from '@rapider/angular-components/core/style';
import { SelectComponentConfig } from '@rapider/angular-components/select';
import { TextBoxType } from '@rapider/angular-components/core/textbox';
import { CrudFormItem } from './crud-form-item.interface';
import { TextboxComponentConfig } from '@rapider/angular-components/textbox';

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
