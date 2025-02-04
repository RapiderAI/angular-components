import { InputSize } from '../../utils/shared/input-size/input-size.enum';
import { TextBoxType } from '../textbox/textbox-type.enum';
import { CrudFormItem } from './crud-form-item.interface';
import { CrudFormMentionItem } from './crud-form-mention-item.interface';

export interface CrudFormTextBoxItem extends CrudFormItem, CrudFormMentionItem {
  mask?: string;
  maskGuide?: boolean;
  textType?: TextBoxType;
  size?: InputSize;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}
