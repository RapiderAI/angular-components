import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CrudTableViewConfig } from '@rapider/angular-components/core/list-grid';
import { cloneDeep } from 'lodash';
import { HeadingType } from '@rapider/angular-components/core/heading';
import { InputSize } from '@rapider/angular-components/core/style';
import { DateFormat } from '@rapider/angular-components/core/services';
import { CommonModule } from '@angular/common';
import { RappiderListGridComponent } from '@rapider/angular-components/list-grid';
import { RappiderModalComponent } from '@rapider/angular-components/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
import { GridBuilderColumnsComponent } from '../grid-builder-columns/index';

@Component({
  selector: 'rappider-grid-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTabsModule,
    ReactiveFormsModule,
    RappiderListGridComponent,
    RappiderModalComponent,
    RappiderSelectComponent,
    RappiderTextboxComponent,
    RappiderSwitchComponent,
    RappiderButtonComponent,
    RappiderNumberInputComponent,
    GridBuilderColumnsComponent,
  ],
  templateUrl: './grid-builder.component.html',
  styleUrls: ['./grid-builder.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => GridBuilderComponent),
      multi: true
    }
  ]
})
export class GridBuilderComponent implements ControlValueAccessor {

  @Output() blur = new EventEmitter<CrudTableViewConfig>();

  /* holds the ngModel value */
  _value: CrudTableViewConfig;
  /* holds the temporarily value, which means when user update something we hold the data in here until form submitted */
  tempValue: CrudTableViewConfig;
  /* holds the initial value without changes */
  tempValueWithoutChanges: CrudTableViewConfig;
  /* initial empty config */
  initialGridConfig: CrudTableViewConfig = {
    columns: [],
    title: {}
  };
  /* holds the modal visibility state */
  isEditModalVisible = false;
  /* heading type options */
  headingTypeOptions = Object.entries(HeadingType).map(([key, value]) => ({
    key: key,
    value: value
  }));
  /* input size options */
  inputSizeOptions = Object.entries(InputSize).map(([key, value]) => ({
    key: key,
    value: value
  }));

  dateFormatOptions = Object.entries(DateFormat).map(([key, value]) => ({
    key: key,
    value: value
  }));

  populatedData: Record<string, unknown>[];

  get value() {
    return this._value;
  }

  set value(value: CrudTableViewConfig) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.blur.emit(this.value);
  }

  constructor() { }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: CrudTableViewConfig) {
    if (!value) {
      this.tempValue = cloneDeep(this.initialGridConfig);
    } else {
      this.tempValue = value;
    }
    this.tempValueWithoutChanges = this.tempValue;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onItemsChange() {
    this.tempValue = { ...this.tempValue };
  }

  onGridConfigSave() {
    this.value = this.tempValue;
    this.tempValueWithoutChanges = cloneDeep(this.tempValue);
    this.closeEditModal();
  }

  onCancel() {
    this.closeEditModal();
  }

  openEditModal() {
    this.isEditModalVisible = true;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
    this.tempValue = cloneDeep(this.value) || this.tempValue;
  }

  onColumnsChange() {
    this.tempValue = { ...this.tempValue };
  }

  onPopulatedDataChange(populatedData: Record<string, unknown>[]) {
    this.populatedData = populatedData;
  }

}
