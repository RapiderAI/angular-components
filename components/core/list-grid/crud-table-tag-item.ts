import { CrudTableViewColumn, CrudViewColumn, CrudViewColumnType } from '../..';
import { CrudTableTagItemSettings } from './crud-table-tag-item-settings';

export interface CrudTableTagItem extends CrudTableViewColumn {
  type: CrudViewColumnType.Tag;
  settings?: CrudTableTagItemSettings;
}
