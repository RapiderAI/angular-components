import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { IconType } from '@rapider/angular-components/core/icon';

export const inputSettingsDropdownConfig: DropdownMenuComponentConfig = {
  icon: {
    name: 'ellipsis',
    type: IconType.NgZorro
  },
  items: [
    {
      label: 'Set as null',
      key: 'setAsNull'
    }
  ]
};
