import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { ParagraphComponentConfig } from '@rapider/angular-components/paragraph';

export interface ChartContent {
  title?: HeadingComponentConfig;
  subtitle?: HeadingComponentConfig;
  description?: ParagraphComponentConfig;
}
