import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { CardsConfig } from '@rapider/angular-components/core/cards';
import { ModalComponentConfig } from '@rapider/angular-components/modal';
import { TextComponentConfig } from '@rapider/angular-components/text';
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
