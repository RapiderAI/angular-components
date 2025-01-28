import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TextBoxSize, TextBoxType } from '@rapider/angular-components/core/textbox';


export interface TextboxComponentConfig {
  placeholder?: string;
  type?: TextBoxType;
  mask?: Array<RegExp | string>;
  maskGuide?: boolean;
  cssStyle?: { [key: string]: any };
  cssClass?: string;
  disabled?: boolean;
  mentionSupported?: boolean;
  mentionPrefix?: string;
  mentionValues?: any;
  size?: TextBoxSize;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
  autoFocus?: boolean;
  autoComplete?: string;
}
