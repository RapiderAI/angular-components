import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { BreadcrumbOption } from '@rapider/angular-components/core/breadcrumb';

export interface TitleBarComponentConfig {
  options?: BreadcrumbOption[];
  cssStyle?: any;
  dropdownMenu?: DropdownMenuComponentConfig;
  actionIcon?: IconComponentConfig;
  mainTitle?: HeadingComponentConfig;
  actionButtons?: ButtonComponentConfig[];
}
