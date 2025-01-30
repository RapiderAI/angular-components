import { AvatarComponentConfig } from '@rapider/angular-components/avatar';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconBlockMode } from '@rapider/angular-components/icon-block';
import { TextComponentConfig } from '@rapider/angular-components/text';

export interface IconBlockComponentConfig {
  avatar: AvatarComponentConfig;
  title: HeadingComponentConfig;
  content: TextComponentConfig;
  mode: IconBlockMode;
}
