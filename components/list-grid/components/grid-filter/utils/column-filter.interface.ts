import { FilterValue } from './filter-value.interface';
import { CrudViewColumnType } from '../../../../../utils';
export interface ColumnFilter {
  fieldName: string;
  filterValue: FilterValue;
  columnType: CrudViewColumnType;
}
