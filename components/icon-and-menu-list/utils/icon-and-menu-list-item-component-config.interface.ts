import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextComponentConfig } from '@rapider/angular-components/text';

export interface IconAndMenuListItemComponentConfig {
  title?: HeadingComponentConfig;
  description?: TextComponentConfig;
  icon?: IconComponentConfig;
  dropdownMenu?: DropdownMenuComponentConfig;
}
