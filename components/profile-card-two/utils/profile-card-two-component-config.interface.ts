import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { CardStatus } from '@rapider/angular-components/profile-card-two';

export interface ProfileCardTwoComponentConfig {
  profilePhoto?: ImageComponentConfig;
  title?: HeadingComponentConfig;
  cardStatus?: CardStatus;
  content?: string;
  icon?: IconComponentConfig;
  iconBadgeCount?: number;
}
