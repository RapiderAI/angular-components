import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '../shared';
import { TextBoxSize } from './textbox-size.enum';
import { TextBoxType } from './textbox-type.enum';

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
