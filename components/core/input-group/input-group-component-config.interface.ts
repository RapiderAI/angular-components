import { ButtonComponentConfig } from '../button/button-component-config.interface';
import { IconComponentConfig } from '../icon/icon-component-config.interface';
import { TextboxComponentConfig } from '../textbox/textbox-component-config.interface';

export interface InputGroupComponentConfig {
  prefixIcon?: IconComponentConfig;
  suffixIcon?: IconComponentConfig;
  prefixButton?: ButtonComponentConfig;
  suffixButton?: ButtonComponentConfig;
  textbox?: TextboxComponentConfig;
  prefixText?: string;
  suffixText?: string;
}
