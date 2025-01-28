import { DividerOrientation } from './divider-orientation.enum';
import { DividerType } from './divider-type.enum';
import { TextComponentConfig } from '../text';
import { DividerStyle } from './divider-style.enum';

export interface DividerComponentConfig {
  style?: DividerStyle;
  type?: DividerType;
  text?: TextComponentConfig;
  textPlacement?: DividerOrientation;
  dividerWidth?: string;
  dividerColor?: string;
}
