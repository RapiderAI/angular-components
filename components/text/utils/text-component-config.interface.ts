import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { TextMode } from '@rapider/angular-components/core/text';

export interface TextComponentConfig {
  // for html mode
  content?: string;
  // for simple text mode
  text?: string;
  textMode?: TextMode;
  typography?: TypographyConfig;
  colorSettings?: ColorConfig;
}
