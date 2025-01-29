import { BorderConfig, BoxShadowConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { TimePickerFormat } from './time-picker-format.enum';

export interface TimePickerComponentConfig {
  borderSettings: BorderConfig;
  customSizeSettings: SizeConfig;
  shadowSettings: BoxShadowConfig;
  paddingSettings: SpacingConfig;
  marginSettings: SpacingConfig;
  text: TextComponentConfig;
  format?: TimePickerFormat;
}
