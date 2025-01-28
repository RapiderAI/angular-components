import { IconComponentConfig } from '@rapider/angular-components/icon';

export interface TabsetComponentConfig {
  title: string;
  content: string;
  icon?: IconComponentConfig;
  forceRender?: boolean;
  disabled?: boolean;
}