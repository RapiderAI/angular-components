import { ButtonComponentConfig } from '../button/button-component-config.interface';
import { CollapseIconPosition } from '../collapse/collapse-icon-position.enum';
import { HeadingComponentConfig } from '../heading/heading-component-config.interface';
import { Panel } from '../panel/panel.interface';

import { ParagraphComponentConfig } from '../paragraph/paragraph-component-config.interface';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig,
  TypographyConfig,
} from '../shared';

export interface CartItem {
  title: HeadingComponentConfig;
  paragraphContent: ParagraphComponentConfig;
  additionalContent: HeadingComponentConfig;
  button: ButtonComponentConfig;
  panels: Panel[];
  collapseIconPosition: CollapseIconPosition;
  bordered: boolean;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
  typographySettings?: TypographyConfig;
}
