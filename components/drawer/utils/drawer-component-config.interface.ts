import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

export interface DrawerComponentConfig {
  title?: string;
  closable?: boolean;
  width?: number;
  height?: number;
  visible?: boolean;
  placement?: NzDrawerPlacement;
  footer?: string;
  keyboard?: boolean;
  closeIcon?: string;
  closeOnNavigation?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: object;
  bodyStyle?: object;
  offsetX?: number;
  offsetY?: number;
  wrapClassName?: string;
  zIndex?: number;
}
