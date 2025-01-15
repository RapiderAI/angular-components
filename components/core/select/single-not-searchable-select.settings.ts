import { SelectMode } from './select-mode.enum';
import { SelectSettings } from './select-settings.interface';

export const SINGLE_NOT_SEARCHABLE_SELECT_SETTINGS: SelectSettings = {
  mode: SelectMode.Single,
  searchable: false
};
