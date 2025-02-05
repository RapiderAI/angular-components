import { AvatarComponentConfig } from "@rapider/angular-components/avatar";
import { ButtonComponentConfig } from "@rapider/angular-components/button";
import { AvatarPlacement, CardOneImagePosition } from "@rapider/angular-components/core/card-one";
import { HeadingComponentConfig } from "@rapider/angular-components/heading";
import { IconComponentConfig } from "@rapider/angular-components/icon";
import { ImageComponentConfig } from "@rapider/angular-components/image";
import { TagComponentConfig } from "@rapider/angular-components/tag";
import { TextComponentConfig } from "@rapider/angular-components/text";


export interface CardOneComponentConfig {
    data?: any;
    image?: ImageComponentConfig;
    imageTags?: TagComponentConfig[];
    imageButtons?: ButtonComponentConfig[];
    imageButtonPlacement?: 'horizontal' | 'vertical';
    imagePosition?: CardOneImagePosition;
    rate?: number;
    titles?: HeadingComponentConfig[];
    currency?: string;
    finalPrice?: number;
    price?: number;
    additionalTags?: TagComponentConfig[];
    additionalButtons?: ButtonComponentConfig[];
    descriptions?: TextComponentConfig[];
    avatar?: AvatarComponentConfig;
    avatarButton?: ButtonComponentConfig;
    avatarPlacement?: AvatarPlacement;
    isSelected?: boolean;
    selectedCardIcon?: IconComponentConfig;
}
