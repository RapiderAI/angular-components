import { IconTextColumnCount } from '../../core/icon-text/icon-text-column-count.enum';
import { IconTextContentMode } from '../../core/icon-text/icon-text-content-mode.enum';
import { IconTextItem } from '../../core/icon-text/icon-text-item.interface';
import { IconTextListMode } from '../../core/icon-text/icon-text-list-mode.enum';

export interface IconTextComponentConfig {
  items: IconTextItem[];
  iconTextListMode: IconTextListMode;
  iconTextContentMode: IconTextContentMode;
  iconTextColumnCount: IconTextColumnCount;
}
