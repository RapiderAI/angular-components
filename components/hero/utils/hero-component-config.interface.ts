import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { HeroHorizontalContentPlacement, HeroVerticalContentPlacement } from '@rapider/angular-components/core/hero';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { TextComponentConfig } from '@rapider/angular-components/text';


export interface HeroComponentConfig {
  backgroundImage: ImageComponentConfig;
  lineBackgroundColor?: string;
  lineWidth?: string;
  content?: TextComponentConfig;
  title?: HeadingComponentConfig;
  button?: ButtonComponentConfig;
  horizontalContentPlacement?: HeroHorizontalContentPlacement;
  verticalContentPlacement?: HeroVerticalContentPlacement;
}
