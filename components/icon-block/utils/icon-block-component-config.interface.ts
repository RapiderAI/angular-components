import { IconBlockMode } from '@rapider/angular-components/core/icon-block';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { AvatarComponentConfig } from '@rapider/angular-components/avatar';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';

export interface IconBlockComponentConfig {
  avatar: AvatarComponentConfig;
  title: HeadingComponentConfig;
  content: TextComponentConfig;
  mode: IconBlockMode;
}
