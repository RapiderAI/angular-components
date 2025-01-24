import { IconComponentConfig } from '../icon/icon-component-config.interface';
import { DropdownMenuItem } from './dropdown-menu-item.interface';
import { DropdownMenuLabelMode } from './dropdown-menu-label-mode.enum';
import { DropdownMenuPlacement } from './dropdown-menu-placement.enum';
import { DropdownMenuTriggerType } from './dropdown-menu-trigger-type.enum';
import { DropdownType } from './dropdown-type.enum';

export interface DropdownMenuComponentConfig {
  label?: string;
  items?: DropdownMenuItem[];
  placement?: DropdownMenuPlacement;
  icon?: IconComponentConfig;
  triggerType?: DropdownMenuTriggerType;
  labelMode?: DropdownMenuLabelMode;
  dropdownType?: DropdownType;
}
