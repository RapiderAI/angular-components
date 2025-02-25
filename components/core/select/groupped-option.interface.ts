import { TemplateRef } from '@angular/core';
import { SelectPopoverConfig } from './select-popover-config.interface';

export interface GrouppedOption {
  label: string | number | TemplateRef<any>;
  value: any;
  disabled?: boolean;
  hide?: boolean;
  groupLabel?: string | TemplateRef<any>;
  selectPopover?: SelectPopoverConfig;
}
