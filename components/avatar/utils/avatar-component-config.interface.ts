import { IconComponentConfig } from '@rapider/angular-components/icon';
import { BorderConfig, SizeConfig, ColorConfig, BoxShadowConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { AvatarShape, AvatarSize } from '@rapider/angular-components/core/avatar';


export interface AvatarComponentConfig {
  /**
   * content(name) of icon for any library
   *
   * @type {string}
   * @memberof AvatarComponentConfig
   * @deprecated please do not "iconName" field. use "icon" instead.
   */
  iconName?: string;
  icon?: IconComponentConfig;
  text?: string;
  shape?: AvatarShape;
  imageUrl?: string;
  altText?: string;
  cssStyle?: string;
  size?: AvatarSize;
  description?: string;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
}
