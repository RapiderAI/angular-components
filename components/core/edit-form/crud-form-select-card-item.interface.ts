import { ButtonComponentConfig } from '../button';
import { CardsConfig } from '../cards/card-config.interface';
import { ModalComponentConfig } from '../modal/modal-config.interface';
import { TextComponentConfig } from '../text';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormSelectCardItem extends CrudFormItem {
  /* page template with search inputs */
  cardsConfig?: CardsConfig;
  /* modal inputs */
  modalConfig?: ModalComponentConfig;
  /* button inputs */
  buttonConfig?: ButtonComponentConfig;
  /* text inputs */
  textConfig?: TextComponentConfig;
}
