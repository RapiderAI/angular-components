import { CrudViewColumnType } from '@rapider/angular-components/core/list-grid';
import { FilterValue } from './filter-value.interface';
export interface ColumnFilter {
  fieldName: string;
  filterValue: FilterValue;
  columnType: CrudViewColumnType;
}
