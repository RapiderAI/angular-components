import { SelectMode } from '../select/select-mode.enum';
import { SelectSettings } from '../select/select-settings.interface';

export const SINGLE_NOT_SEARCHABLE_SELECT_SETTINGS: SelectSettings = {
  mode: SelectMode.Single,
  searchable: false
};
