import { ColorConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { TextMode } from './text-mode.enum';

export interface TextComponentConfig {
  // for html mode
  content?: string;
  // for simple text mode
  text?: string;
  textMode?: TextMode;
  typography?: TypographyConfig;
  colorSettings?: ColorConfig;
}
