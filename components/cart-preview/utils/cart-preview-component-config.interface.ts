import { DropdownMenuPlacement, DropdownMenuTriggerType } from '@rapider/angular-components/core/dropdown-menu';
import { ButtonComponentConfig } from '@rapider/angular-components/button';

export interface CartPreviewComponentConfig {
  cartItem: CartPreviewComponentConfig[];
  footer: string;
  footerContent: string;
  buttons: ButtonComponentConfig[];
  dropdownButton: ButtonComponentConfig;
  placement: DropdownMenuPlacement;
  triggerType: DropdownMenuTriggerType;
}
