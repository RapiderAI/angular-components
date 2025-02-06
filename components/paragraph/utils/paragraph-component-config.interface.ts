import { ColorConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';

export interface ParagraphComponentConfig {
  content?: string;
  typography: TypographyConfig;
  colorSettings?: ColorConfig;
}
