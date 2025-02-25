import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ButtonActionBehavior } from '@rapider/angular-components/core/button';
import { IconAndMenuListItemComponentConfig } from './icon-and-menu-list-item-component-config.interface';

export interface IconAndMenuListComponentConfig {
  items?: IconAndMenuListItemComponentConfig[];
  title?: string;
  button?: ButtonComponentConfig;
  buttonActionBehavior?: ButtonActionBehavior;
  buttonRedirectUrl?: string;
}
