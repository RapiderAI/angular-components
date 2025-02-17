import { BreadcrumbOption } from '@rapider/angular-components/core/breadcrumb';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';

export interface TitleToolbarComponentConfig {
  mainTitle: HeadingComponentConfig;
  options?: BreadcrumbOption[] | string[] | string;
}
