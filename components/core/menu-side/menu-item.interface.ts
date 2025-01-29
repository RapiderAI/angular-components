import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TagComponentConfig } from '@rapider/angular-components/tag';
import { MenuActionBehavior } from './menu-action-behavior.enum';

export interface MenuItem {
  key: string;
  title: string;
  icon?: IconComponentConfig;
  tag?: TagComponentConfig;
  actionBehavior: MenuActionBehavior;
  redirectUrl?: string;
  queryParams?: any;
  children?: MenuItem[];
}
