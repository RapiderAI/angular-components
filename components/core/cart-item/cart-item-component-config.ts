import { ImageComponentConfig } from '@rapider/angular-components/image';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { CartItemAdditionalContent } from '@rapider/angular-components/core/cart-item/cart-item-additional-content.interface';
import { CartItem } from '@rapider/angular-components/core/cart-item/cart-item.interface';


export interface CartItemComponentConfig {
    image: ImageComponentConfig;
    divider?: string;
    item: CartItem;
    additionalItems: CartItemAdditionalContent[];
    additionalItemsTitle?: HeadingComponentConfig;
}
