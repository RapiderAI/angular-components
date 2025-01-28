import { MenuConfig, MenuPlacement } from "@rapider/angular-components/core/menu";


export interface MenuComponentConfig {
  config: MenuConfig;
  isCollapsed?: boolean;
  paddingValue?: number;
  menuPlacement?: MenuPlacement;
}
