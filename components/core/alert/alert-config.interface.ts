import { ButtonComponentConfig } from '@rapider/angular-components/core/button';
import { HeadingComponentConfig } from '@rapider/angular-components/core/heading';
import { TextComponentConfig } from '@rapider/angular-components/core/text';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig,
} from '@rapider/angular-components/core/style';
import { AlertActionConfigPlacement } from './alert-action-config-placement.enum';
import { AlertType } from './alert-type.enum';


export interface AlertConfig {
  data?: any;
  type: AlertType;
  title?: HeadingComponentConfig;
  description?: TextComponentConfig;
  showIcon: boolean;
  closeable: boolean;
  actionConfig?: ButtonComponentConfig;
  actionConfigPlacement?: AlertActionConfigPlacement;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
}
