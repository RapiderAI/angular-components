import { TextComponentConfig } from '@rapider/angular-components/text';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TooltipPlacement } from '@rapider/angular-components/core/button';
import { TagType } from '@rapider/angular-components/core/tag';

export interface TagComponentConfig {
  mode?: TagType;
  checked?: boolean;
  color?: string;
  text?: TextComponentConfig;
  icon?: IconComponentConfig;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
}
