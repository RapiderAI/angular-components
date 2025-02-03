import { DateFormat } from '@rapider/angular-components/core/common';
import { DatePickerDateMode, DatePickerSplitter } from '@rapider/angular-components/core/date-picker';
import { BorderConfig, BoxShadowConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TextComponentConfig } from '@rapider/angular-components/text';

export interface DatePickerComponentConfig {
  minSelectableDate: Date;
  maxSelectableDate: Date;
  cssStyle?: { [key: string]: any };
  cssClass?: string;
  placeholder?: string;
  dateMode?: DatePickerDateMode;
  boxBorder?: boolean;
  borderSettings?: BorderConfig;
  marginSettings?: SpacingConfig;
  paddingSettings?: SpacingConfig;
  shadowSettings?: BoxShadowConfig;
  text?: TextComponentConfig;
  customSizeSettings?: SizeConfig;
  dateFormat?: DateFormat;
  splitter?: DatePickerSplitter;
}
