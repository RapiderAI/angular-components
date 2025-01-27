import { IconComponentConfig } from '@rapider/angular-components/icon/utils/icon-component-config.interface';
import { MenuActionBehavior } from '@rapider/angular-components/core/menu/menu-action-behavior.enum';


export interface DropdownMenuItem {
  label: string;
  key?: string;
  icon?: IconComponentConfig;
  actionBehavior?: MenuActionBehavior;
  redirectUrl?: string;
  items?: DropdownMenuItem[];
  data?: any;
  popconfirmTitle?: string;
  popConfirmOkDanger?: boolean;
  visible?: boolean;
}
