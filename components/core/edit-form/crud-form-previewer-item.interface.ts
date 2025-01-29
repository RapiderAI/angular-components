import { ButtonComponentConfig } from '../button';
import { ModalComponentConfig } from '../modal';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormPreviewerItem extends CrudFormItem {
  modalConfig?: ModalComponentConfig;
  buttonConfig?: ButtonComponentConfig;
  source?: any;
  visibility?: boolean;
}
