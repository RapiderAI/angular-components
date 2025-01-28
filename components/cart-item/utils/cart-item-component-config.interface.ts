import { ImageComponentConfig } from '@rapider/angular-components/image';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { CartItem, CartItemAdditionalContent } from '@rapider/angular-components/core/cart-item';


export interface CartItemComponentConfig {
    image: ImageComponentConfig;
    divider?: string;
    item: CartItem;
    additionalItems: CartItemAdditionalContent[];
    additionalItemsTitle?: HeadingComponentConfig;
}
