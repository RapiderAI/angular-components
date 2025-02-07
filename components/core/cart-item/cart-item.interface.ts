import { AccordionPanel, AccordionCollapseIconPosition } from '@rapider/angular-components/core/accordion';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { ParagraphComponentConfig } from '@rapider/angular-components/paragraph';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';

export interface CartItem {
  title: HeadingComponentConfig;
  paragraphContent: ParagraphComponentConfig;
  additionalContent: HeadingComponentConfig;
  button: ButtonComponentConfig;
  panels: AccordionPanel[];
  collapseIconPosition: AccordionCollapseIconPosition;
  bordered: boolean;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
  typographySettings?: TypographyConfig;
}
