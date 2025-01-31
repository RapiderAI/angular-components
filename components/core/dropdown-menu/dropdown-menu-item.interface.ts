import { IconComponentConfig } from '@rapider/angular-components/icon';
import { DropdownMenuActionBehavior } from './dropdown-menu-action-behavior.enum';

export interface DropdownMenuItem {
  label: string;
  key?: string;
  icon?: IconComponentConfig;
  actionBehavior?: DropdownMenuActionBehavior;
  redirectUrl?: string;
  items?: DropdownMenuItem[];
  data?: any;
  popconfirmTitle?: string;
  popConfirmOkDanger?: boolean;
  visible?: boolean;
}
