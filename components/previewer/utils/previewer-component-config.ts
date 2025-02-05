import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ModalComponentConfig } from '@rapider/angular-components/modal';

export interface PreviewerComponentConfig {
  modalConfig?: ModalComponentConfig;
  buttonConfig?: ButtonComponentConfig;
  source?: any;
  visibility?: boolean;
}