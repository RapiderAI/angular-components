import { IconComponentConfig } from '../icon';
import { CrudTableViewColumn } from './crud-table-view-column.interface';
import { IconSettings } from './icon-settings.interface';

export interface CrudTableViewIconColumn extends CrudTableViewColumn {
  iconSettings: IconComponentConfig;
}
