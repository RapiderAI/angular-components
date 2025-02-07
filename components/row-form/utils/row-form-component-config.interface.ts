import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { TextboxComponentConfig } from '@rapider/angular-components/textbox';
import { RowFormColumn } from '@rapider/angular-components/core/row-form';

export interface RowFormComponentConfig {
  orderable?: boolean;
  addButtonVisible?: boolean;
  addButton?: ButtonComponentConfig;
  columns?: RowFormColumn[];
  hasInitialEmptyRow?: boolean;
  editButton?: ButtonComponentConfig;
  cancelButton?: ButtonComponentConfig;
  saveButton?: ButtonComponentConfig;
  removeListItemButton?: ButtonComponentConfig;
  textboxConfig?: TextboxComponentConfig;
}
