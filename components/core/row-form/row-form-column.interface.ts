import { CrudFormItemValidator } from '@rapider/angular-components/core/edit-form';
import { InputTemplateTypeAndFormat } from '@rapider/angular-components/core/input-template';
import { RowFormColumnConfig } from './row-form-column-config.interface';

export interface RowFormColumn {
  typeAndFormat: InputTemplateTypeAndFormat;
  fieldName: string;
  placeholder?: string;
  unique?: boolean;
  validators?: CrudFormItemValidator[];
  visible?: boolean;
  showCodemirrorForObjectAndArray?: boolean;
  config?: RowFormColumnConfig;
}
