import { SelectMode } from './select-mode.enum';

export interface SelectSettings {
  searchable?: boolean;
  mode?: SelectMode;
  allowClear?: boolean;
  maxTagCount?: number;
}
