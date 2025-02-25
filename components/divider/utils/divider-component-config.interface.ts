import { TextComponentConfig } from '@rapider/angular-components/text';
import { DividerOrientation, DividerType, DividerStyle } from '@rapider/angular-components/core/divider';

export interface DividerComponentConfig {
  style?: DividerStyle;
  type?: DividerType;
  text?: TextComponentConfig;
  textPlacement?: DividerOrientation;
  dividerWidth?: string;
  dividerColor?: string;
}
