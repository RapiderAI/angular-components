import { IconComponentConfig } from '@rapider/angular-components/icon/utils/icon-component-config.interface';
import { DropdownMenuItem } from '@rapider/angular-components/core/dropdown-menu/dropdown-menu-item.interface';
import { DropdownMenuLabelMode } from '@rapider/angular-components/core/dropdown-menu/dropdown-menu-label-mode.enum';
import { DropdownMenuPlacement } from '@rapider/angular-components/core/dropdown-menu/dropdown-menu-placement.enum';
import { DropdownMenuTriggerType } from '@rapider/angular-components/core/dropdown-menu/dropdown-menu-trigger-type.enum'; 
import { DropdownType } from '@rapider/angular-components/core/dropdown-menu/dropdown-type.enum'; 


export interface DropdownMenuComponentConfig {
  label?: string;
  items?: DropdownMenuItem[];
  placement?: DropdownMenuPlacement;
  icon?: IconComponentConfig;
  triggerType?: DropdownMenuTriggerType;
  labelMode?: DropdownMenuLabelMode;
  dropdownType?: DropdownType;
}
