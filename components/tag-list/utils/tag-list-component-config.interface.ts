import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { Tag } from '@rapider/angular-components/core/tag';
import { TagListDirectionMode } from '@rapider/angular-components/core/tag-list';

export interface TagListComponentConfig {
  titles: HeadingComponentConfig;
  items: Tag[];
  directionMode: TagListDirectionMode;
}
