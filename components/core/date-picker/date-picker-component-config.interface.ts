import { DatePickerDateMode } from './date-picker-date-mode.enum';
import { DateFormat } from './date-picker-date-format.enum';
import { DateSplitter } from './date-picker-splitter.enum';
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
  splitter?: DateSplitter;
}
