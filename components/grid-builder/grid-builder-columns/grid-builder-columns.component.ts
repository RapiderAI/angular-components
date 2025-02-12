import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { SelectableOption } from '@rapider/angular-components/core/form';
import { CrudTableViewColumn, CrudViewColumn, CrudViewColumnType } from '@rapider/angular-components/core/list-grid';
import { GenerateExampleDataService } from '../utils/services/generate-example-data/generate-example-data.service';
import { PropertyType } from '@rapider/angular-components/core/input-template';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rappider-grid-builder-columns',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RappiderSelectComponent,
    RappiderTextboxComponent,
    RappiderSwitchComponent,
    RappiderButtonComponent,
    DragDropModule,
  ],
  templateUrl: './grid-builder-columns.component.html',
  styleUrls: ['./grid-builder-columns.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => GridBuilderColumnsComponent),
      multi: true
    }
  ]
})
export class GridBuilderColumnsComponent implements OnInit, ControlValueAccessor {

  @Output() populatedDataChange = new EventEmitter<Record<string, unknown>[]>();

  _value: CrudTableViewColumn[];
  typeSelectOptions: SelectableOption[] = Object.entries(CrudViewColumnType).map(([key, value]) => ({ key: key, value: value }));
  inputTemplateTypeSelectOptions: SelectableOption[] = Object.entries(PropertyType).map(([key, value]) => ({ key: key, value: value }));
  initialCrudFormItem: any = {
    type: undefined,
    title: undefined,
    fieldName: undefined,
    inputTemplateType: undefined,
    visible: true
  };

  CrudViewColumnType = CrudViewColumnType;

  editedIndex: number | undefined;
  isFirstInitialize = true;
  tempCrudViewItem: CrudTableViewColumn = cloneDeep(this.initialCrudFormItem);

  editButtonIconConfig = {
    type: 'FONT_AWESOME',
    name: 'fa-light fa-pen-to-square'
  };

  deleteButtonIconConfig = {
    type: 'FONT_AWESOME',
    name: 'fa-sharp fa-solid fa-trash'
  };

  /* every field name must be unique.We're holding this variable to check if there are any overlapped field name. */
  hasFieldNameError = false;
  /* form submittion state */
  tempValueSubmitted = false;
  /* has error while adding new item */
  hasAddError = false;
  /* if the item is new, its true else ( edits ) it's false */
  isAddingControl = false;
  /* populated example data from field type */
  populatedData: Record<string, unknown>[] = [];

  get value() {
    return this._value;
  }

  set value(value: CrudTableViewColumn[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor(
    private generateExampleDataService: GenerateExampleDataService
  ) { }

  ngOnInit(): void {
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: CrudTableViewColumn[]) {
    if (!value) {
      this._value = [cloneDeep(this.initialCrudFormItem)];
      this.editedIndex = 0;
      this.isFirstInitialize = true;
    } else {
      this._value = cloneDeep(value);
      this.populateData();
      this.editedIndex = undefined;
      this.isFirstInitialize = false;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  addColumn() {
    if (!this.editedIndex && this.editedIndex !== 0) {
      this.value.push(cloneDeep(this.initialCrudFormItem));
      this.editedIndex = this.value.length - 1;
      this.hasAddError = false;
      this.isAddingControl = true;
    } else {
      this.hasAddError = true;
    }
  }

  onSave() {
    if (this.isItemValid()) {
      this.value[this.editedIndex] = this.tempCrudViewItem;
      this.populateData();
      this.clearTempValue();
      this.isFirstInitialize = false;
      this.hasFieldNameError = false;
      this.tempValueSubmitted = false;
      this.isAddingControl = false;
      this.onChange(this.value);

    } else {
      if (!this.isFieldNameUnique()) {
        this.hasFieldNameError = true;
      }
      this.tempValueSubmitted = true;
    }
  }

  onEditItemClick(index: number) {
    if (this.isAddingControl) {
      this.value = this.value.filter((item, index) => index !== this.value.length - 1);
    }
    this.tempCrudViewItem = cloneDeep(this.value[index]);
    this.editedIndex = index;
  }

  onEditCancel() {
    if (this.isAddingControl) {
      this.value = this.value.filter((item, index) => index !== this.editedIndex);
      this.isAddingControl = false;
    }
    this.clearTempValue();
  }

  clearTempValue() {
    this.tempCrudViewItem = cloneDeep(this.initialCrudFormItem);
    this.editedIndex = undefined;
  }

  onDeleteItemClick(deletedItemIndex: number) {
    this.value = this.value.filter((item, index) => index !== deletedItemIndex);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.value, event.previousIndex, event.currentIndex);
    this.onChange(this.value);
  }

  isItemValid() {
    return this.tempCrudViewItem.fieldName && this.tempCrudViewItem.title && this.tempCrudViewItem.type && this.isFieldNameUnique();
  }

  isFieldNameUnique() {
    const hasOverlappedFieldName = this.value.some((item, index) => item.fieldName === this.tempCrudViewItem.fieldName && index !== this.editedIndex);
    return !hasOverlappedFieldName;
  }

  populateData() {
    this.populatedData = this.generateExampleDataService.generateExampleDataFromCrudTableColumns(this.value);
    this.populatedDataChange.emit(this.populatedData);
  }

}
