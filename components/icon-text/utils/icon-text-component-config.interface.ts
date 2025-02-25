import {
  IconTextListMode,
  IconTextItem,
  IconTextContentMode,
  IconTextColumnCount
} from '@rapider/angular-components/core/icon-text';

export interface IconTextComponentConfig {
  items: IconTextItem[];
  iconTextListMode: IconTextListMode;
  iconTextContentMode: IconTextContentMode;
  iconTextColumnCount: IconTextColumnCount;
}
