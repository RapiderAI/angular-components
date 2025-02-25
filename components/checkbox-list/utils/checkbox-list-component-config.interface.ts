import { ButtonComponentConfig } from'@rapider/angular-components/button';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { CheckboxList, CheckboxListDirection } from '@rapider/angular-components/core/checkbox-list';

export interface CheckboxListComponentConfig {
  direction?: CheckboxListDirection;
  header?: HeadingComponentConfig;
  options?: CheckboxList[];
  button?: ButtonComponentConfig;
}
