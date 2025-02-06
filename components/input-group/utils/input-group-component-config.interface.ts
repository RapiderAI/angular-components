import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextboxComponentConfig } from '@rapider/angular-components/textbox';

export interface InputGroupComponentConfig {
  prefixIcon?: IconComponentConfig;
  suffixIcon?: IconComponentConfig;
  prefixButton?: ButtonComponentConfig;
  suffixButton?: ButtonComponentConfig;
  textbox?: TextboxComponentConfig;
  prefixText?: string;
  suffixText?: string;
}
