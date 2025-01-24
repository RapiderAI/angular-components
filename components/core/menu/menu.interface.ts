import { IconComponentConfig } from '../icon/icon-component-config.interface';
import { MenuActionBehavior } from './menu-action-behavior.enum';

export interface Menu {
  label: string;
  /* In the menu component, we can hide labels by setting showLabels input to False.
   * However, if you want to show only one element you can set this field as True.
   */
  showLabel?: boolean;
  key?: string;
  data?: any;
  icon?: IconComponentConfig;
  children?: Menu[];
  level?: number;
  disabled?: boolean;
  selected?: boolean;
  style?: string;
  tag?: string;
  tagColor?: string;
  actionBehavior?: MenuActionBehavior;
  redirectUrl?: string;
  queryParams?: Record<string, unknown>;
  isExpanded?: boolean;
  tooltip?: string;
}
