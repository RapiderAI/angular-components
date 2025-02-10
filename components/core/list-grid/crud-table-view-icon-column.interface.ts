import { IconComponentConfig } from '@rapider/angular-components/icon';
import { CrudTableViewColumn } from './crud-table-view-column.interface';

export interface CrudTableViewIconColumn extends CrudTableViewColumn {
  iconSettings: IconComponentConfig;
}
