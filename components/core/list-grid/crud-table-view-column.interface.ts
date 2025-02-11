import { CrudViewColumnType } from './crud-view-column-type.enum';
import { CrudViewColumn } from './crud-view-column.interface';

export interface CrudTableViewColumn extends CrudViewColumn {
  title: string;
  sortable?: boolean;
  color?: string;
  fixedColumnOnLeft?: boolean;
  fixedColumnOnRight?: boolean;
  isListGridDataObject?: boolean;
  inputTemplateType?: CrudViewColumnType;
}
