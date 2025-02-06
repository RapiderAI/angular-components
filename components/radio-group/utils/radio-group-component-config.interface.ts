import { RadioGroupButtonStyle, RadioGroupOptions, RadioGroupSize } from '@rapider/angular-components/core/radio-group';

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
