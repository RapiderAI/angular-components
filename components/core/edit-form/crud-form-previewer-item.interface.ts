import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ModalComponentConfig } from '@rapider/angular-components/modal';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormPreviewerItem extends CrudFormItem {
  modalConfig?: ModalComponentConfig;
  buttonConfig?: ButtonComponentConfig;
  source?: any;
  visibility?: boolean;
}
