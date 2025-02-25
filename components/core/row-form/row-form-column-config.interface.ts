import { SelectableOption } from "@rapider/angular-components/core/common";
import { SelectSettings } from "@rapider/angular-components/core/select";
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from "@rapider/angular-components/core/style";
import { SwitchSize } from "@rapider/angular-components/core/switch";
import { TextComponentConfig } from "@rapider/angular-components/text";

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