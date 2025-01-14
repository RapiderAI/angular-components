import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { HeadingType } from '@rapider/angular-components/core/heading';

export interface HeadingComponentConfig {
  type?: HeadingType;
  content?: string;
  typography?: TypographyConfig;
  colorSettings?: ColorConfig;
}
