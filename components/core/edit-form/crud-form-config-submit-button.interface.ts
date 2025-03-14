import { NzButtonSize } from 'ng-zorro-antd/button';
import { ButtonShape, ButtonType } from '@rapider/angular-components/core/button';

export interface CrudFormConfigSubmitButton {
  text?: string;
  visible?: boolean;
  size?: NzButtonSize;
  type?: ButtonType;
  shape?: ButtonShape;
  transparent?: boolean;
  block?: boolean;
  disabled?: boolean;
  danger?: boolean;
  loading?: boolean;
  icon?: any;
  iconPlacement?: any;
}
