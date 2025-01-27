import { ButtonComponentConfig } from "@rapider/angular-components/button";
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { BorderConfig, SizeConfig, ColorConfig, BoxShadowConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { Panel } from '@rapider/angular-components/core/panel';
import { RappiderParagraphComponent } from '@rapider/angular-components/paragraph';
import { CollapseIconPosition } from '@rapider/angular-components/core/collapse/collapse-icon-position.enum';


export interface CartItem {
  title: HeadingComponentConfig;
  paragraphContent: RappiderParagraphComponent;
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
