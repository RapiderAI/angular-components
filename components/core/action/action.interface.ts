/* eslint-disable no-shadow */
import { ButtonType, ButtonIconPlacement } from '@rapider/angular-components/core/button';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { ActionBehavior } from './action-behavior.enum';
import { ActionView } from './action-view.enum';
import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { HorizontalPosition } from './horizontal-position.enum';


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
  icon?: IconComponentConfig | any;
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
  popConfirmCancelText?: string;
  popConfirmOkText?: string;
  popConfirmOkDanger?: boolean;
  popconfirmPlacement?: any;
  tooltipText?: string;
  data?: any;
  redirectTarget?: string;
}
