import { FontAwesomeIconAnimation } from './font-awesome-icon-animation.enum';
import { FontAwesomeIconStyle } from './font-awesome-icon-style.enum';
import { IconType } from './icon-type.enum';
import { NgZorroIconTheme } from './ng-zorro-icon-theme.type';

export interface IconComponentConfig {
  name: string; /* icon class */
  type?: IconType;
  theme?: NgZorroIconTheme; /* for ng zorro type */
  color?: string;
  /**
   * size should be used with px suffix. for example: "14px"
   *
   * @type {string}
   * @memberof IconComponentConfig
   */
  size?: string;
  secondColor?: string;
  animation?: FontAwesomeIconAnimation;
  style?: FontAwesomeIconStyle;
  isClickable?: boolean;
}
