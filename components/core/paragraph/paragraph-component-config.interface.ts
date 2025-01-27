import { ColorConfig } from '../shared/color/color.interface';
import { TypographyConfig } from '../shared/typography/typography.interface';

export interface ParagraphComponentConfig {
  content?: string;
  typography: TypographyConfig;
  colorSettings?: ColorConfig;
}
