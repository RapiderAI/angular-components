import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconComponentConfig } from '@rapider/angular-components/icon';

export interface UnorderedListOneComponentConfig {
  titleIcon?: IconComponentConfig;
  title?: HeadingComponentConfig;
  list: string[];
}
