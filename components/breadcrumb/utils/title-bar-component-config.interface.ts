import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { BreadcrumbOption } from '../../core/breadcrumb/breadcrumb-option.interface';
//import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';

export interface TitleBarComponentConfig {
    options?: BreadcrumbOption[];
    cssStyle?: any;
   // dropdownMenu?: DropdownMenuComponentConfig; Update this line after creating the DropdownMenuComponentConfig interface
    actionIcon?: IconComponentConfig;
    mainTitle?: HeadingComponentConfig;
    actionButtons?: ButtonComponentConfig[];
}