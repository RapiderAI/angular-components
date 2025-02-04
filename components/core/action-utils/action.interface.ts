/* eslint-disable no-shadow */
import { NzButtonType } from 'ng-zorro-antd/button';
import { ButtonType, IconPlacement } from '../button';
import { IconSet } from '../icon-utils/icon-set.interface';
import { IconComponentConfig } from '../icon/icon-component-config.interface';
import { ActionBehavior } from './action-behavior.enum';
import { ActionView } from './action-view.enum';
import { HorizontalPosition } from './horizontal-position.enum';
import { DropdownMenuComponentConfig, DropdownMenuItem } from '../dropdown-menu';
import { PopConfirmPlacement } from '../button/pop-confirm-placement.enum';

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
  iconPlacement?: IconPlacement;
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
  popconfirmPlacement?: PopConfirmPlacement;
  tooltipText?: string;
  data?: any;
  redirectTarget?: string;
}
