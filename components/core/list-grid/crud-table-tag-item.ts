import { CrudTableTagItemSettings } from './crud-table-tag-item-settings';
import { CrudTableViewColumn } from './crud-table-view-column.interface';
import { CrudViewColumnType } from './crud-view-column-type.enum';

export interface CrudTableTagItem extends CrudTableViewColumn {
  type: CrudViewColumnType.Tag;
  settings?: CrudTableTagItemSettings;
}
