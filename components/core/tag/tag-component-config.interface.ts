import { TextComponentConfig } from '@rapider/angular-components/core/text';
import { IconComponentConfig } from '@rapider/angular-components/core/icon';
import { TooltipPlacement } from '@rapider/angular-components/core/button';
import { TagType } from './tag-type.enum';

export interface TagComponentConfig {
  mode?: TagType;
  checked?: boolean;
  color?: string;
  text?: TextComponentConfig;
  icon?: IconComponentConfig;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
}
