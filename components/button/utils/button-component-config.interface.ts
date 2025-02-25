import {
  ButtonRedirectMode,
  ButtonActionBehavior,
  TooltipPlacement,
  ButtonType,
  ButtonSize,
  ButtonShape,
  ButtonIconPlacement,
  ButtonColorType,
  ButtonRedirectTarget,
  FormButtonType,
} from '@rapider/angular-components/core/button';
import { BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig, BorderConfig } from '@rapider/angular-components/core/style';
import { IconComponentConfig } from '@rapider/angular-components/icon';

export interface ButtonComponentConfig {
  key?: string;
  text?: string;
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  transparent?: boolean;
  loading?: boolean;
  block?: boolean;
  disabled?: boolean;
  icon?: IconComponentConfig;
  colorType?: ButtonColorType;
  popconfirmTitle?: string;
  emitWithoutPopconfirm?: boolean;
  iconPlacement?: ButtonIconPlacement;
  formButtonType?: FormButtonType;
  borderSettings?: BorderConfig;
  marginSettings?: SpacingConfig;
  paddingSettings?: SpacingConfig;
  shadowSettings?: BoxShadowConfig;
  customColorSettings?: ColorConfig;
  customSizeSettings?: SizeConfig;
  tooltipText?: string;
  popconfirmCancelText?: string;
  popconfirmOkText?: string;
  popconfirmOkDanger?: boolean;
  behavior?: ButtonActionBehavior;
  redirectUrl?: string;
  redirectMode?: ButtonRedirectMode;
  redirectTarget?: ButtonRedirectTarget;
  tooltipPlacement?: TooltipPlacement;
  customCssClass?: string;
}
