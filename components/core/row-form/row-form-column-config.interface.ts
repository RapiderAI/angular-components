import { SelectableOption } from "../form-utils";
import { SelectSettings } from "../select";
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from "../shared";
import { SwitchSize } from "../switch";
import { TextComponentConfig } from "../text";

export interface RowFormColumnConfig {
  mask?: string;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  customSizeSettings?: SizeConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
  cssClass?: string;
  cssStyle?: any;
  disabled?: boolean;
  placeholder?: string;
  text?: TextComponentConfig;
  size?: SwitchSize;
  loading?: boolean;
  options?: SelectableOption[];
  settings?: SelectSettings;
}