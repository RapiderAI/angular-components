import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { TextComponentConfig } from '@rapider/angular-components/text';

export interface AccordionPanel {
  active?: boolean;
  name: HeadingComponentConfig;
  content: TextComponentConfig;
  disabled?: boolean;
}
