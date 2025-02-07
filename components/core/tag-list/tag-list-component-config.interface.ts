import { HeadingComponentConfig } from '../heading';
import { Tag } from '../tag/tag.interface';
import { TagListDirectionMode } from './tag-list-direction-mode.enum';

export interface TagListComponentConfig {
  titles: HeadingComponentConfig;
  items: Tag[];
  directionMode: TagListDirectionMode;
}
