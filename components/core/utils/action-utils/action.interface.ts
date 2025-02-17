/* eslint-disable no-shadow */
import { ActionBehavior } from './action-behavior.enum';
import { ActionView } from './action-view.enum';
import { HorizontalPosition } from './horizontal-position.enum';
import { ButtonType, ButtonIconPlacement } from '@rapider/angular-components/core/button';
import { IconSet } from '@rapider/angular-components/core/utils/icon-utils';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { TooltipPlacement } from '@rapider/angular-components/core/button';

export enum RedirectUrlMode {
  /* navigates to absolute path */
  NavigateToAbsolutePath = 'navigate-to-absolute-path',
  /* uses angular's navigate() fn, so that you can redirect to relative paths and use the data */
  Navigate = 'navigate',
}

export interface Action {
  name?: string;
  text?: string;
  buttonType?: ButtonType;
  icon?: IconComponentConfig | IconSet;
  iconPlacement?: ButtonIconPlacement;
  view?: ActionView;
  behavior: ActionBehavior;
  actions?: Action[];
  redirectUrl?: string;
  redirectUrlMode?: RedirectUrlMode;
  queryParams?: Record<string, unknown>;
  horizontalPosition?: HorizontalPosition;
  displayAsMenu?: boolean;
  /** if action behavior is dropdown, then this config will render the dropdown menu */
  dropdownConfig?: DropdownMenuComponentConfig;
  cssClass?: string;
  cssStyle?: { [key: string]: any };
  disabled?: boolean;
  popconfirmTitle?: string;
  emitWithoutPopconfirm?: boolean;
  popconfirmCancelText?: string;
  popconfirmOkText?: string;
  popconfirmOkDanger?: boolean;
  popconfirmPlacement?: TooltipPlacement;
  tooltipText?: string;
  data?: any;
  redirectTarget?: string;
}
