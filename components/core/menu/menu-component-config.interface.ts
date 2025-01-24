import { MenuConfig } from './menu-config.interface';
import { MenuPlacement } from './menu-placement.enum';

export interface MenuComponentConfig {
  config: MenuConfig;
  isCollapsed?: boolean;
  paddingValue?: number;
  menuPlacement?: MenuPlacement;
}
