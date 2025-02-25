import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { GrouppedOption, SelectSettings } from '@rapider/angular-components/core/select';
import { BorderConfig, BoxShadowConfig, ColorConfig, InputSize, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';

export interface SelectComponentConfig {
  options?: SelectableOption[];
  grouppedOptions?: GrouppedOption[];
  settings?: SelectSettings;
  placeholder?: string;
  cssStyle?: { [key: string]: any };
  cssClass?: string;
  invalidConfigText?: string;
  disabled?: boolean;
  loading?: boolean;
  buttons?: ButtonComponentConfig[];
  dropdownMatchSelectWidth?: boolean;
  dropdownClassName?: string;
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
  size?: InputSize;
}
