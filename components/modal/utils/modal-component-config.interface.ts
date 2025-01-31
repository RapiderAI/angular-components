import { NgTemplateOutlet } from '@angular/common';
import { TemplateRef } from '@angular/core';

export interface ModalComponentConfig {
  title?: string;
  visible?: boolean;
  okText?: string;
  cancelText?: string;
  width?: string;
  okDisabled?: boolean;
  cancelDisabled?: boolean;
  footer?: TemplateRef<NgTemplateOutlet>;
  okLoading?: boolean;
  okDanger?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  className?: string;
  bodyStyle?: any;
  closeIconVisibility?: boolean;
  fullScreen?: boolean;
}
