import { CartItem, CartItemAdditionalContent } from '@rapider/angular-components/core/cart-item';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { ImageComponentConfig } from '@rapider/angular-components/image';

export interface CartItemComponentConfig {
    image: ImageComponentConfig;
    divider?: string;
    item: CartItem;
    additionalItems: CartItemAdditionalContent[];
    additionalItemsTitle?: HeadingComponentConfig;
}
