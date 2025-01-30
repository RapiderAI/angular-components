import { DropdownMenuComponentConfig } from '../dropdown-menu';
import { IconType } from '../icon';

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
