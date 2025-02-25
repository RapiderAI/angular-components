import { FontAwesomeIconAnimation, FontAwesomeIconStyle, IconType, NgZorroIconTheme } from '@rapider/angular-components/core/icon';

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
