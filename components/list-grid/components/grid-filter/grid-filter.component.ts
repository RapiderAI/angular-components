import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerComponentConfig } from '@rapider/angular-components/date-picker';
import cloneDeep from 'lodash/cloneDeep';
import { IconType } from '@rapider/angular-components/core/icon';
import { CrudViewColumnType } from '@rapider/angular-components/core/list-grid';
import { booleanValueOptions } from './utils/boolean-dropdown-options';
import { booleanConditions, dateConditions, numberConditions, stringConditions } from './utils/dropdown-items';
import { filterSupportedColumnTypes } from './utils/filter-supported-column-types';
import { FilterValue } from './utils/filter-value.interface';
import { CommonCondition, conditionMapping, NumberCondition } from './utils/operations';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderDividerComponent } from '@rapider/angular-components/divider';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderRadioGroupComponent } from '@rapider/angular-components/radio-group';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


@Component({
  selector: 'rappider-grid-filter',
  templateUrl: './grid-filter.component.html',
  styleUrls: ['./grid-filter.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NzDropDownModule,
    RappiderIconComponent,
    RappiderButtonComponent,
    RappiderSelectComponent,
    NzCollapseModule,
    RappiderDividerComponent,
    RappiderRadioGroupComponent
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => GridFilterComponent),
      multi: true
    }
  ]
})
export class GridFilterComponent implements OnInit, ControlValueAccessor {

  @Input() columnType: CrudViewColumnType;
  @Input() data: any;
  @Input() fieldName: string;
  @Input() datePicker: DatePickerComponentConfig;

  @Output() dataChange = new EventEmitter<any>();

  filterSupportedColumnTypes = filterSupportedColumnTypes;
  CrudViewColumnType = CrudViewColumnType;

  _value: FilterValue;

  filterButtonConfig = {
    icon: {
      name: 'fa-solid fa-filter',
      type: IconType.FontAwesome
    }
  };

  removeFilterButtonConfig = {
    type: 'link',
    icon: {
      name: 'fa-solid fa-xmark',
      type: IconType.FontAwesome,
      color: 'var(--text-color)'
    }
  };

  booleanButtonConfig = {
    icon: {
      name: 'fa-solid fa-caret-down',
      type: IconType.FontAwesome
    }
  };

  filterIconConfig = {
    name: 'fa-solid fa-bars-filter'
  };

  OkButtonConfig = {
    text: 'OK',
    type: 'primary',
    size: 'small'
  };

  cancelButtonConfig = {
    text: 'Cancel',
    type: 'default',
    size: 'small'
  };

  dateConditions = dateConditions;
  numberConditions = numberConditions;
  stringConditions = stringConditions;
  booleanConditions = booleanConditions;

  booleanValueOptions = booleanValueOptions;

  defaultValue: FilterValue;

  dropdownVisibility = false;
  activeTab: boolean;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: FilterValue): void {
    this.initDefaultValue();
    this._value = value ?? cloneDeep(this.defaultValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onConditionChange() {
    const conditionFunction = conditionMapping.find(item => item.type === this.columnType)?.filterFunction;
    if (conditionFunction && (this.value.filterValue != null || [CommonCondition.IsEmpty, CommonCondition.IsNotEmpty].includes(this.value.condition))) {
      const filteredData = conditionFunction(this.data, this.value.filterValue, this.fieldName, this.value.condition);
      this.dataChange.emit(filteredData);
    } else {
      this.dataChange.emit(this.data);
    }
  }

  initDefaultValue() {
    if ([CrudViewColumnType.Text, CrudViewColumnType.Link].includes(this.columnType)) {
      this.defaultValue = {
        condition: null,
        filterValue: null
      };
    } else if (this.columnType === CrudViewColumnType.Number) {
      this.defaultValue = {
        condition: NumberCondition.IsEqualTo,
        filterValue: null
      };
    } else if (this.columnType === CrudViewColumnType.Date) {
      this.defaultValue = {
        condition: null,
        filterValue: null
      };
    } else {
      this.defaultValue = {
        condition: null,
        filterValue: null
      };
    }
  }

  isTypeSupportedForFilter() {
    return filterSupportedColumnTypes.some(item => item === this.columnType);
  }

  removeFilter() {
    this.value.filterValue = null;
    this.value.condition = null;
    this.onConditionChange();
  }

  toggleDropdown(event) {
    this.dropdownVisibility = !this.dropdownVisibility;
    event.stopPropagation();
  }

  changeActiveTabStatus() {
    this.activeTab = !this.activeTab;
  }
}
