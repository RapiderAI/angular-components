import { ButtonComponentConfig, DropdownMenuPlacement, DropdownMenuTriggerType } from '..';

export interface CartPreviewComponentConfig {
    cartItem: CartPreviewComponentConfig[];
    footer: string;
    footerContent: string;
    buttons: ButtonComponentConfig[];
    dropdownButton: ButtonComponentConfig;
    placement: DropdownMenuPlacement;
    triggerType: DropdownMenuTriggerType;
}
