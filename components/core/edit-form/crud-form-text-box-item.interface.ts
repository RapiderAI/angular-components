import { InputSize } from '@rapider/angular-components/core/style';
import { TextBoxType } from '@rapider/angular-components/core/textbox';
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
