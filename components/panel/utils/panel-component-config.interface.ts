import { TextComponentConfig } from '@rapider/angular-components/text';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';

export interface Panel {
  active?: boolean;
  name: HeadingComponentConfig;
  content: TextComponentConfig;
  disabled?: boolean;
}
