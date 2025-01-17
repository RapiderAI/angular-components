import { TemplateRef } from '@angular/core';
import { CalendarMode } from './calendar-mode.enum';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig
} from '@rapider/angular-components/core/style';
import { CalendarEvent } from './calendar-event.interface';
import { TypographyConfig } from '@rapider/angular-components/core/typography';


export interface CalendarComponentConfig {
  mode?: CalendarMode;
  isFullscreen?: boolean;
  dateCell?: TemplateRef<Date>;
  dateFullCell?: TemplateRef<Date>;
  monthCell?: TemplateRef<Date>;
  monthFullCell?: TemplateRef<Date>;
  calendarEvents?: CalendarEvent[];
  borderSettings?: BorderConfig;
  sizeSettings?: SizeConfig;
  colorSettings?: ColorConfig;
  boxShadowSettings?: BoxShadowConfig;
  marginSettings?: SpacingConfig;
  paddingSettings?: SpacingConfig;
  typographySettings?: TypographyConfig;
}