import { AvatarComponentConfig } from '@rapider/angular-components/avatar';
import { TextComponentConfig } from '@rapider/angular-components/text';

export interface MessageOneItem {
  avatar?: AvatarComponentConfig;
  time?: TextComponentConfig;
  message?: TextComponentConfig;
  name?: TextComponentConfig;
}
