import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges, TemplateRef } from '@angular/core';
import moment from 'moment-timezone';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, KeyValue } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import { ColumnFilter } from './components/grid-filter/utils/column-filter.interface';
import { NzTableComponent, NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmComponent, NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverComponent, NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { RappiderRateDisplayComponent } from '@rapider/angular-components/rate-display';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RappiderDropdownMenuComponent } from '@rapider/angular-components/dropdown-menu';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderCheckboxComponent } from '@rapider/angular-components/checkbox';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
import { RappiderDatePickerComponent } from '@rapider/angular-components/date-picker';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { NzCollapseComponent } from 'ng-zorro-antd/collapse';
import { RappiderDividerComponent } from '@rapider/angular-components/divider';
import { RappiderRadioGroupComponent } from '@rapider/angular-components/radio-group';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { Action, ActionBehavior, ActionResponse, ActionView, HorizontalPosition } from '@rapider/angular-components/core/action';
import { CRUD_TABLE_DEFAULT_PAGINATION, CrudTableViewColumn, CrudTableViewConfig, CrudViewColumnType, FieldValueChangeOutput, OrderChangeOutput, crudTableDefaultItemActionsLength } from '@rapider/angular-components/core/list-grid';
import { DropdownMenuItem } from '@rapider/angular-components/core/dropdown-menu';
import { RappiderPaginationService, TemplatingService } from '@rapider/angular-components/core/services';
import { RappiderInputTemplateComponent } from '@rapider/angular-components/input-template';
import { RappiderTagListComponent } from '@rapider/angular-components/tag-list';
import { GridFilterComponent } from './components/grid-filter/grid-filter.component';


@Component({
  selector: 'rappider-list-grid',
  templateUrl: './list-grid.component.html',
  imports:[
    CommonModule,
    TranslateModule,
    DragDropModule,
    RouterModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzSelectModule,
    NzTableModule,
    NzTagComponent,
    NzDropDownModule,
    NzDividerComponent,
    RappiderRateDisplayComponent,
    NzIconModule,
    RappiderDropdownMenuComponent,
    RappiderTextboxComponent,
    RappiderCheckboxComponent,
    RappiderNumberInputComponent,
    RappiderDatePickerComponent,
    RappiderHeadingComponent,
    RappiderIconComponent,
    RappiderButtonComponent,
    RappiderSelectComponent,
    NzCollapseComponent,
    RappiderDividerComponent,
    RappiderRadioGroupComponent,
    RappiderInputTemplateComponent,
    RappiderTagListComponent,
    GridFilterComponent
  ],
  providers: [
    RappiderPaginationService,
    TemplatingService
  ],
  standalone: true,
  styleUrls: ['./list-grid.component.scss']
})
export class RappiderListGridComponent implements OnInit, OnChanges {

  @Input() config: CrudTableViewConfig;
  @Input() data: any[];
  @Input() loading: boolean;
  @Input() loadingMessage = 'We are fetching the data, please wait...';
  /* col span border */
  @Input() borderless: boolean;
  @Input() showEllipsisTextWithPopover = false; // for CrudViewColumnType.Text
  @Input() showEllipsisLinkWithPopover = false; // for CrudViewColumnType.Link
  @Input() customDropdownTemplate: TemplateRef<any>;

  /* redirection url data to be replaced in specified url template */
  @Input() redirectUrlData: Record<string, any>;
  @Input() pageNumber = 1;

  @Output() listActionClick = new EventEmitter<ActionResponse>();
  @Output() columnActionClick = new EventEmitter<ActionResponse>();
  @Output() orderChange = new EventEmitter<OrderChangeOutput>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() fieldValueChange = new EventEmitter<FieldValueChangeOutput>();
  @Output() columnItemClick = new EventEmitter<any>();
  @Output() listActionDropdownItemClick = new EventEmitter<any>();
  @Output() paginationChange = new EventEmitter<NzTableQueryParams>();
  @Output() searchTextChange = new EventEmitter<string>();

  CrudViewColumnType = CrudViewColumnType;
  ActionBehavior = ActionBehavior;
  ActionView = ActionView;

  sort: KeyValue<string, 'asc' | 'desc' | null>;
  isAllSelected = false;
  isIndeterminate = false;
  selectedComponents: { [key: string]: boolean } = {};
  displayedData = [];
  visibleColumns = [];
  searchText = null;

  /* TODO: this path will be moved to a service */
  noImageUrl = 'assets/images/no-image.png';

  HorizontalPosition = HorizontalPosition;

  columnFilters!: ColumnFilter[];
  /* defining exec template fn */
  execTemplate!: (templateString: string, data: any) => string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paginationService: RappiderPaginationService,
    private templatingService: TemplatingService
  ) {
    this.execTemplate = this.templatingService.execTemplate;
  }

  ngOnInit() {
    /* Show only visible fields */
    this.filterColumnsByVisibility();
    this.displayedData = cloneDeep(this.data || []);
    this.initFilterVariable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.orderData();
      const data = cloneDeep(this.data || []);
      this.displayedData = [...data];
      this.initDefaults();
      this.config = { ...this.config };
      this.filterData(this.searchText);
    }
    if (changes['config']) {
      this.filterColumnsByVisibility();
      this.initFilterVariable();
    }
  }

  initDefaults() {
    this.setDefaultPagination();
    this.setDefaultItemActionLength();
  }

  setDefaultItemActionLength() {
    if (this.config.itemActionsLength == null) {
      this.config.itemActionsLength = crudTableDefaultItemActionsLength;
    }
  }

  setDefaultPagination() {
    if (!this.config.showPagination) {
      this.config.pageSize = this.displayedData.length;
    } else if (!this.config.pageSize) {
      this.config.pageSize = CRUD_TABLE_DEFAULT_PAGINATION.PAGE_SIZE;
    }
  }


  orderData() {
    if (this.data?.length && this.config?.order) {
      const orderConfig = this.config.order;
      this.data = orderBy(this.data, orderConfig.fieldName, orderConfig.type);
    }
  }

  emitFieldValueChange(column: CrudTableViewColumn, value: any, data: any) {
    const updatedData: any = {};
    updatedData[column.fieldName] = value;
    const emitBody: FieldValueChangeOutput = {
      columnData: data,
      updatedData: updatedData
    };
    this.fieldValueChange.emit(emitBody);
  }

  refreshStatus(): void {
    const validData = this.data.filter(c => c);
    const isAllSelected = validData.length && validData.every(item => item['selected']);
    const isAllUnselected = validData.every(item => !item['selected']);
    this.isAllSelected = isAllSelected;
    this.isIndeterminate = !isAllSelected && !isAllUnselected;
    /* emit selected items */
    let selectedItems: any;

    if (this.isMultipleSelectionEnabled()) {
      selectedItems = this.displayedData.filter(item => item.selected);
    } else {
      selectedItems = this.displayedData.find(item => item.selected) || null;
    }

    this.selectionChange.emit(selectedItems);
  }

  onBulkSelectionChange(isSelected: boolean): void {
    if (this.isMultipleSelectionEnabled()) {
      this.displayedData = this.displayedData.map(item => ({
        ...item,
        selected: isSelected
      }));
    }
    this.refreshStatus();
  }

  selectItems(isSelected?: boolean, rowIndex?: number) {
    if (this.isMultipleSelectionEnabled()) {
      const selectedData = this.displayedData.find((item, index) => index === rowIndex);
      selectedData.selected = !selectedData.selected;
    } else {
      const alreadySelectedData = this.displayedData.find((item, index) => index !== rowIndex && item.selected);
      if (alreadySelectedData) {
        alreadySelectedData.selected = false;
      }
      const selectedData = this.displayedData[rowIndex];
      selectedData.selected = isSelected;
    }
    this.refreshStatus();
  }

  isMultipleSelectionEnabled() {
    return this.config?.enableMultipleSelection === true;
  }

  formatDate(dateValue) {
    return moment(dateValue).format('MMMM Do YYYY, h:mm:ss a');
  }

  filterData(searchText: string): void {
    if (!searchText?.trim() || (!this.config?.multipleSearchFields?.length && !this.config?.defaultSearchField)) {
      this.displayedData = [...(this.data || [])];
      this.searchTextChange.emit(searchText);
      return;
    }

    this.searchText = searchText;

    const searchTerms = searchText.trim().toLowerCase().split(' ');

    const filteredData = this.data?.filter(item => {
      if (this.config?.multipleSearchFields?.length > 0) {
        return searchTerms.every(term =>
          this.config.multipleSearchFields.some(field => {
            const value = item[field]?.toString().toLowerCase();
            return value?.includes(term);
          })
        );
      }
      if (this.config?.defaultSearchField) {
        return searchTerms.every(term => {
          const value = item[this.config.defaultSearchField]?.toString().toLowerCase();
          return value?.includes(term);
        });
      }
      return true;
    }) || [];


    this.searchTextChange.emit(searchText);
    this.displayedData = this.sort
      ? orderBy(filteredData, this.sort.key, this.sort.value)
      : filteredData;
  }

  clearSearchText() {
    this.searchText = null;
    this.displayedData = [...this.data];
  }

  convertToDate(dateValue) {
    if (this.config.dateFormat) {
      const formatDate = (date, format) => {
        const dateParts = new Intl.DateTimeFormat(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).formatToParts(date);

        const parts = {
          dd: dateParts.find(p => p.type === 'day')?.value || '',
          MM: dateParts.find(p => p.type === 'month')?.value || '',
          yyyy: dateParts.find(p => p.type === 'year')?.value || '',
        };

        return format.replace(/dd|MM|yyyy/g, match => parts[match]);
      };

      const date = new Date(dateValue);

      return dateValue ? formatDate(date, this.config.dateFormat) : null;
    } else {
      return dateValue ? moment(dateValue).toDate() : null;
    }
  }

  onPaginationChange(paginationData: NzTableQueryParams) {
    this.paginationChange.emit(paginationData);
  }

  sortData(sort: KeyValue<string, string>) {
    /* get order */
    if (sort.value === 'ascend') {
      /* set sort data */
      this.sort = {
        key: sort.key, /* field name */
        value: 'asc' /* order type */
      };
    } else if (sort.value === 'descend') {
      /* set sort data */
      this.sort = {
        key: sort.key, /* field name */
        value: 'desc' /* order type */
      };
    } else {
      this.sort = null;
    }
    /* filter data */
    this.filterData(this.searchText);
  }

  getVisibleColumns(columns) {
    return columns?.filter(column => this.visibleColumns.includes(column.fieldName));
  }

  initFilterVariable() {
    this.columnFilters = this.getVisibleColumns(this.config.columns)?.map(column => ({ fieldName: column.fieldName, filterValue: null, columnType: column.type }));
  }

  getVisibilityChangableColumnList(columns: CrudTableViewColumn[]): CrudTableViewColumn[] {
    return columns?.filter(column => column.fieldName);
  }

  onFilterChange(filter) {
    this.initFilterVariable();
  }

  onListActionClick(action: Action) {
    if (action.behavior === ActionBehavior.Route) {
      /* navigate */
      this.redirectToUrlByAction(
        action,
        this.redirectUrlData
      );
    } else if (action.behavior === ActionBehavior.Emit) {
      /* emit */
      const actionResponse: ActionResponse = {
        action: action
      };
      this.listActionClick.emit(actionResponse);
    }
  }
  cancel() {
  }
  onColumnActionClick(action: Action, data: any, rowIndex: number) {
    if (!action.disabled) {
      if (action.behavior === ActionBehavior.Route) {
        /* navigate */
        this.redirectToUrlByAction(action, data);
      } else if (action.behavior === ActionBehavior.Emit) {
        /* emit */
        const actionResponse: ActionResponse = {
          action: action,
          data: data,
          rowIndex: this.paginationService.getSkippedSizeByPagination(this.pageNumber) + rowIndex
        };
        this.columnActionClick.emit(actionResponse);
      }
    }
  }

  redirectToUrlByAction(action: Action, data: any) {
    /* navigate */
    let url = action.redirectUrl;
    /* set id if specified */
    if (action.redirectUrl && data?.id) {
      url = this.execTemplate(action.redirectUrl, data);
    }
    if (action?.redirectUrlMode === 'navigate') {
      this.router.navigate([url], { relativeTo: this.route?.parent });
    } else {
      this.router.navigateByUrl(url);
    }
  }

  onRowOrderChange(event: CdkDragDrop<any[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      /* change order in the array */
      const eventPreviousIndex = this.paginationService.getSkippedSizeByPagination(this.pageNumber) + event.previousIndex;
      const eventCurrentIndex = this.paginationService.getSkippedSizeByPagination(this.pageNumber) + event.currentIndex;
      moveItemInArray(this.displayedData, eventPreviousIndex, eventCurrentIndex);
      this.displayedData = [...this.displayedData];
      /* emit order change */
      const orderStartIndex = this.paginationService.
        getSkippedSizeByPagination(this.pageNumber) + Math.min(event.previousIndex, event.currentIndex);
      const orderEndIndex = this.paginationService.
        getSkippedSizeByPagination(this.pageNumber) + Math.max(event.previousIndex, event.currentIndex);
      const orderChangeEmitData = {
        orderStartIndex: orderStartIndex,
        orderEndIndex: orderEndIndex,
        data: this.displayedData.slice(orderStartIndex, orderEndIndex + 1)
      };
      this.orderChange.emit(orderChangeEmitData);
    }
  }

  filterColumnsByVisibility() {
    this.visibleColumns = (<CrudTableViewColumn[]>this.config.columns)?.filter(c => c.visible !== false).map(c => c.fieldName) || [];
  }

  hasDropdownListAction(horizontalPosition: HorizontalPosition) {
    if (horizontalPosition === HorizontalPosition.Left) {
      return this.config.listActions.some(item => item.displayAsMenu && (item.horizontalPosition !== HorizontalPosition.Right));
    } else {
      return this.config.listActions.some(item => item.displayAsMenu && (item.horizontalPosition === HorizontalPosition.Right));
    }
  }

  onEmitItemClick(data: any) {
    this.columnItemClick.emit(data);
  }

  /* this function returns config function if exists else returns false */
  checkListOrderable(data: any[], item: any) {
    if (this.config.handleorderableFn) {
      return this.config.handleorderableFn(data, item);
    } else {
      return false;
    }
  }

  /* this function returns config function if exists else returns true */
  checkActionButtonVisibility(data: any[], item: any, action: Action) {
    if (this.config.handleVisibilityFn) {
      return this.config.handleVisibilityFn(data, item, action);
    } else {
      return true;
    }
  }

  /* this function returns config function if exists else returns false */
  checkActionButtonDisabled(data: any[], item: any, action: Action) {
    if (this.config.handleDisableFn) {
      return this.config.handleDisableFn(data, item, action);
    } else {
      return false;
    }
  }

  /* this function returns config function if exists else returns '' */
  checkActionButtonTooltip(data: any[], item: any, action: Action) {
    if (this.config.handleTooltipFn) {
      return this.config.handleTooltipFn(data, item, action);
    } else {
      return '';
    }
  }

  isListGridDataObject(data: any): boolean {
    return isObject(data);
  }

  /* this functions checks visible buttons in config for dropdown menu visibility, if there is no visible button returns false */
  checkItemActionDropdownMenuVisiblity(displayedData: any[], item: any, itemActions: Action[]) {
    return itemActions.some(itemAction => this.checkActionButtonVisibility(displayedData, item, itemAction));
  }

  /**
   * getting field value by nested field name
   * for ex.
   * {
   *   parent: {
   *     child: 5
   *   }
   * }
   *
   * fieldName: 'parent.child'
   *
   * lodash.get supports 'parent.child' field-name to get a nested field value
   *
   * @param {*} data
   * @param {string} fieldName
   * @return {*}
   * @memberof RappiderListGridComponent
   */
  getFieldValueByFieldName(data: any, fieldName: string) {
    return get(data, fieldName);
  }

  onDataFilter(data) {
    this.displayedData = data;
  }

  onListActionDropdownItemClick(action: DropdownMenuItem) {
    if (action.actionBehavior === 'emit') {
      this.listActionDropdownItemClick.emit(action);
    }
  }
}
