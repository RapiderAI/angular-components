import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { IconTextActionBehavior } from './icon-text-action-behavior.enum';

export interface IconTextItem {
  icon: IconComponentConfig;
  text: TextComponentConfig;
  redirectrUrl: string;
  routeBehavior: IconTextActionBehavior;
}
