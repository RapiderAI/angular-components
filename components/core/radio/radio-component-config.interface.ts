import { BoxShadowConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { RadioDirection } from './radio-component-direction.enum';

export interface RadioConfig {
  options?: SelectableOption[];
  cssStyle?: { [key: string]: any };
  cssClass?: string;
  invalidConfigText?: string;
  shadowSettings?: BoxShadowConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
  color?: string;
  width?: string;
  height?: string;
  showOptionsAsButtons?: boolean;
  direction?: RadioDirection;
}