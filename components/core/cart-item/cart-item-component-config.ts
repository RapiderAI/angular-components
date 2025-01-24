import { ImageComponentConfig, CartItem, CartItemAdditionalContent } from '..';
import { HeadingComponentConfig } from '../heading';

export interface CartItemComponentConfig {
    image: ImageComponentConfig;
    divider?: string;
    item: CartItem;
    additionalItems: CartItemAdditionalContent[];
    additionalItemsTitle?: HeadingComponentConfig;
}
