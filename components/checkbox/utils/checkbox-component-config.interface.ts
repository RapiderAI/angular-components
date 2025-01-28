import { BorderConfig, BoxShadowConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { IconComponentConfig } from'@rapider/angular-components/icon';
import { CheckboxType } from '@rapider/angular-components/core/checkbox/checkbox-type.enum';
import { TextComponentConfig } from '@rapider/angular-components/text';

export interface CheckboxComponentConfig {
  text: TextComponentConfig;
  icon: IconComponentConfig;
  disabled?: boolean;
  cssStyle: { [key: string]: any };
  cssClass: string;
  checkboxType: CheckboxType;
  tooltip: string;
  additionalIcon: IconComponentConfig;
  borderSettings: BorderConfig;
  customSizeSettings: SizeConfig;
  shadowSettings: BoxShadowConfig;
  paddingSettings: SpacingConfig;
  marginSettings: SpacingConfig;
}