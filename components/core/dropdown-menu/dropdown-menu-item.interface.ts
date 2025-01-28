import { IconComponentConfig } from '@rapider/angular-components/icon';
import { MenuActionBehavior } from '@rapider/angular-components/core/menu';


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
