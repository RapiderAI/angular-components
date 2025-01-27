import { AvatarComponentConfig } from '@rapider/angular-components/avatar/utils';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { HeadingComponentConfig } from'@rapider/angular-components/heading';
import { IconBlockMode } from '@rapider/angular-components/core/icon-block';

export interface IconBlockComponentConfig {
  avatar: AvatarComponentConfig;
  title: HeadingComponentConfig;
  content: TextComponentConfig;
  mode: IconBlockMode;
}
