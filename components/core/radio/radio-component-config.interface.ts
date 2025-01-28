import { BoxShadowConfig } from '@rapider/angular-components/core/style';
import { SpacingConfig } from '@rapider/angular-components/core/style';
import { RadioDirection } from './radio-component-direction.enum';
import { SelectableOption } from '@rapider/angular-components/core/common/selectable-option.type';

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