import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { HeadingComponentConfig } from '@rapider/angular-components/core/heading';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { AlertActionConfigPlacement, AlertType } from '@rapider/angular-components/core/alert';


export interface AlertComponentConfig {
  title?: HeadingComponentConfig;
  description?: TextComponentConfig;
  type: AlertType;
  data?: any;
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
