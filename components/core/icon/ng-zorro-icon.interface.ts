import { IconComponentConfig } from './icon-component-config.interface';
import { NgZorroIconTheme } from './ng-zorro-icon-theme.enum';

export interface NgZorroIcon extends IconComponentConfig {
  theme?: NgZorroIconTheme;
}
