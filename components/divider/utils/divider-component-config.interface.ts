import { TextComponentConfig } from '@rapider/angular-components/text';
import { DividerOrientation } from '@rapider/angular-components/core/divider/divider-orientation.enum';
import { DividerType } from '@rapider/angular-components/core/divider/divider-type.enum';
import { DividerStyle } from '@rapider/angular-components/core/divider/divider-style.enum';

export interface DividerComponentConfig {
  style?: DividerStyle;
  type?: DividerType;
  text?: TextComponentConfig;
  textPlacement?: DividerOrientation;
  dividerWidth?: string;
  dividerColor?: string;
}
