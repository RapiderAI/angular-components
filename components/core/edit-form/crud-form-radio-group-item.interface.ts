import { RadioGroupButtonStyle, RadioGroupOptions, RadioGroupSize } from '@rapider/angular-components/core/radio-group';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormRadioGroupItem extends CrudFormItem {
  options: RadioGroupOptions[];
  cssStyle: { [key: string]: any };
  cssClass: string;
  invalidConfigText: string;
  size: RadioGroupSize;
  disabled: boolean;
  title: string;
  buttonStyle: RadioGroupButtonStyle;
}
