import { RadioGroupButtonStyle } from './radio-group-button-style.enum';
import { RadioGroupOptions } from './radio-group-options.interface';
import { RadioGroupSize } from './radio-group-size.enum';

export interface RadioGroupComponentConfig {
  options: RadioGroupOptions[];
  cssStyle?: { [key: string]: any };
  cssClass?: string;
  invalidConfigText?: string;
  size?: RadioGroupSize;
  disabled?: boolean;
  title?: string;
  buttonStyle?: RadioGroupButtonStyle;
}
