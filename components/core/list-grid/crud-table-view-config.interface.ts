import { Action } from '../action-utils/action.interface';
import { InputSize } from '../../utils/shared/input-size/input-size.enum';
import { HeadingComponentConfig } from '../heading';
import { CrudTableViewColumn } from './crud-table-view-column.interface';
import { CrudViewConfig } from './crud-view-config.interface';
import { ListGridOrder } from './list-grid-order.interface';
import { ListGridScroll } from './list-grid-scroll.interface';
import { DateFormat } from '../date-picker';

export interface CrudTableViewConfig extends CrudViewConfig {
  dateFormat?: DateFormat;
  title?: HeadingComponentConfig;
  columnVisibilitySelectable?: boolean;
  searchable?: boolean; /* display a search field in order to search by text */
  /* key of the field name that is going to be searched on
   * Note that if multipleSearchFields is provided, defaultSearchField value will be ignored
   */
  defaultSearchField?: string;
  multipleSearchFields?: string[]; /* for multiple fields */
  columns: CrudTableViewColumn[];
  selectable?: boolean;
  enableMultipleSelection?: boolean;
  listActions?: Action[];
  size?: InputSize;
  orderable?: boolean; /* allow to drag drop row item in order to order the item */
  handleorderableFn?: Function;
  sortable?: boolean; /* flag to allow for sorting columns, default is true */
  order?: ListGridOrder;
  handleVisibilityFn?: Function;
  handleDisableFn?: Function;
  handleTooltipFn?: Function;
  pageSize?: number;
  showPagination?: boolean;
  itemActionsLength?: number;
  filterable?: boolean;
  hideToolbar?: boolean;
  scroll?: ListGridScroll;
  fixedActionColumn?: boolean;
  nzFrontPagination?: boolean;
  nzTotal?: number;
  searchPlaceholder?: string;
}
