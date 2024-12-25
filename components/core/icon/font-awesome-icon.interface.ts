import { FontAwesomeIconStyle } from './font-awesome-icon-style.enum';
import { IconComponentConfig } from './icon-component-config.interface';

export interface FontAwesomeIcon extends IconComponentConfig {
  style?: FontAwesomeIconStyle;
}
