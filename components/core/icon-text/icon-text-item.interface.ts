import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { IconTextActionBehavior } from '@rapider/angular-components/core/icon-text';

export interface  IconTextItem {
  icon: IconComponentConfig;
  text: TextComponentConfig;
  redirectrUrl: string;
  routeBehavior: IconTextActionBehavior;
}
