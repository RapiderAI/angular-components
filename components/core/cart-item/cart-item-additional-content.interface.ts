import { ButtonComponentConfig } from '../button/button-component-config.interface';
import { IconBlockComponentConfig } from '../icon-block/icon-block-component-config.interface';

export interface CartItemAdditionalContent {
  iconBlock?: IconBlockComponentConfig;
  button?: ButtonComponentConfig;
}
