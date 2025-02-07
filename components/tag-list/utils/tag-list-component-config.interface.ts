import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { Tag } from '@rapider/angular-components/core/tag';
import { TagListDirectionMode } from '../../core/tag-list/tag-list-direction-mode.enum';

export interface TagListComponentConfig {
  titles: HeadingComponentConfig;
  items: Tag[];
  directionMode: TagListDirectionMode;
}
