import { ButtonComponentConfig } from '@rapider/angular-components/button/utils/button-component-config.interface';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextboxComponentConfig } from '@rapider/angular-components/core/textbox/textbox-component-config.interface';


export interface InputGroupComponentConfig {
  prefixIcon?: IconComponentConfig;
  suffixIcon?: IconComponentConfig;
  prefixButton?: ButtonComponentConfig;
  suffixButton?: ButtonComponentConfig;
  textbox?: TextboxComponentConfig;
  prefixText?: string;
  suffixText?: string;
}
