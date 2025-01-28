import { IconComponentConfig } from '@rapider/angular-components/icon';
import { DropdownMenuItem, DropdownMenuLabelMode, DropdownMenuPlacement, DropdownMenuTriggerType, DropdownType } from '@rapider/angular-components/core/dropdown-menu';



export interface DropdownMenuComponentConfig {
  label?: string;
  items?: DropdownMenuItem[];
  placement?: DropdownMenuPlacement;
  icon?: IconComponentConfig;
  triggerType?: DropdownMenuTriggerType;
  labelMode?: DropdownMenuLabelMode;
  dropdownType?: DropdownType;
}
