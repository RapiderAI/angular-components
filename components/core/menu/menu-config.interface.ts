import { Menu } from './menu.interface';
import { MenuMode } from './menu-mode.enum';

export interface MenuConfig {
  items: Menu[];
  mode: MenuMode;
  backgroundColor?: string;
  tooltip?: string;
  redirectUrl?: string;
}
