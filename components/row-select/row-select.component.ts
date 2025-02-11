import { Component, OnInit, Input, OnDestroy, EventEmitter, OnChanges, SimpleChanges, Output, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormService } from '@rapider/angular-components/core/services';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { TextboxComponentConfig } from '@rapider/angular-components/textbox';
import { UniqueValidator } from '@rapider/angular-components/core/validators';
import { cloneDeep } from 'lodash';
import { RowSelectColumn } from '@rapider/angular-components/core/row-select';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderInputErrorComponent } from '@rapider/angular-components/input-error';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rappider-row-select',
  templateUrl: './row-select.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DragDropModule,
    NzInputModule,
    NzButtonComponent,
    RappiderInputErrorComponent,
    RappiderButtonComponent,
    RappiderSelectComponent,
    RappiderTextboxComponent
  ],
  standalone: true,
  styleUrls: ['./row-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderRowSelectComponent),
      multi: true
    }
  ]
})
export class RappiderRowSelectComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  /* orderable */
  @Input() orderable: boolean;
  /* columns */
  @Input() columns: RowSelectColumn[];
  /* text of add button */
  @Input() addButton: ButtonComponentConfig;
  @Input() editButton: ButtonComponentConfig;
  @Input() cancelButton: ButtonComponentConfig;
  @Input() saveButton: ButtonComponentConfig;
  /* visibility status of add button */
  @Input() addButtonVisible: boolean;
  /* has initial empty row, if true adds empty row */
  @Input() hasInitialEmptyRow: boolean;
  @Input() textboxConfig: TextboxComponentConfig;


  /* returns KeyValue paired data of the row */
  @Output() rowDataChange = new EventEmitter<KeyValue<string, any>>();
  /* returns nothing, just trigger */
  @Output() rowInsert = new EventEmitter();
  /* returns nothing, just trigger */
  @Output() rowIndexChange = new EventEmitter();
  /* returns deleted row data */
  @Output() rowDelete = new EventEmitter<KeyValue<string, any>>();
  @Output() blur = new EventEmitter();
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;
  editMode = false;

  subscriptions: Subscription[];

  initialValue: any;
  _value: any;
  addForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createInitialEmptyRow();
    this.initRowListForm();
    this.onEditButtonClick();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.initRowListForm();
    }
  }

  ngOnDestroy() {
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
  }

  get value() {
    return this._value;
  }

  set value(value: any[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value) {
    this._value = value;
    this.initialValue = cloneDeep(value);
    this.setFormItems(value);
  }

  setFormItems(value: any[]) {
    /* if the datas not initialized to the form then add them all to the form */
    if (value && this.form) {
      this.getRowsFormArray().clear();
      value.forEach(item => this.insertListItemByData(item));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  initRowListForm() {
    /* set form as null if config is invalid */
    if (!this.columns?.length) {
      this.form = null;
    } else {
      /* set form array validators */
      const uniqueFieldNames = this.columns.filter(column => column.unique).map(column => column.fieldName);
      const formArrayValidators: any[] = [
        ...uniqueFieldNames.map(fieldName => UniqueValidator(fieldName))
      ];
      /* create form array */
      this.form = this.formBuilder.group({
        rows: this.formBuilder.array([], { validators: formArrayValidators })
      });
    }
  }

  createInitialEmptyRow() {
    if (this.hasInitialEmptyRow) {
      /* push new row form */
      const newRowForm = this.createRowForm('');
      this.getRowsFormArray()?.push(newRowForm);
      /* emit row insert */
      this.rowInsert.emit();
    } else {
      return;
    }
  }

  getRowsFormArray(): FormArray {
    return <FormArray>this.form?.get('rows');
  }

  onRowDelete(index: number) {
    const rowsFormArray = this.getRowsFormArray();
    const data = rowsFormArray.at(index).value;
    rowsFormArray.removeAt(index);
    this.rowDelete.emit(data);
  }

  onRowDataChange(index: number) {
    /* Check if the line is valid */
    const isValid = this.getRowsFormArray().at(index).valid;
    /* Performs the transaction if the changed data is valid */
    if (isValid) {
      /* get changed row data */
      const rowData = this.getRowsFormArray().at(index).value;
      /* emit row data */
      this.rowDataChange.emit(rowData);
    }
  }

  insertListItem() {
    /* remove empty list items */
    this.removeEmptyListItems();
    /* push new row form */
    const newRowForm = this.createRowForm();
    this.getRowsFormArray().push(newRowForm);
    /* emit row insert */
    this.rowInsert.emit();
  }

  insertListItemByData(data?: any) {
    /* remove empty list items */
    this.removeEmptyListItems();
    /* push new row form */
    const newRowForm = this.createRowForm(data);
    this.getRowsFormArray().push(newRowForm);
  }

  removeListItem(index: number) {
    const rowsFormArray = this.getRowsFormArray();
    const deletedData = rowsFormArray.at(index).value;
    rowsFormArray.removeAt(index);
    this.rowDelete.emit(deletedData);
    this.onBlur();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (this.orderable) {
      if (event.previousIndex !== event.currentIndex) {
        const rowsFormArray = this.getRowsFormArray();
        moveItemInArray(rowsFormArray.controls, event.previousIndex, event.currentIndex);
        /* move rows */
        moveItemInArray(this.form.value.rows, event.previousIndex, event.currentIndex);
        this.rowIndexChange.emit();
      }
    }
  }

  createRowForm(data?: any) {
    /* create a list item */
    const formFields = {};
    this.columns.forEach(column => {
      /* get initial value */
      const value = data && data[column.fieldName] || null;
      /* get form field validators */
      const fieldValidators = column.validators?.filter(validator => validator.type).map(validator => validator.type) || [];
      /* set form field */
      formFields[column.fieldName] = [value, fieldValidators];
    });
    /* create form group */
    const form = this.formBuilder.group(formFields);
    if (data) {
      this.formService.checkFormValidation(form);
    }
    return form;
  }

  isEmptyObject(row: any): boolean {
    return !Object.values(row).some(value => (value !== null && value !== '' && value !== undefined));
  }

  removeEmptyListItems() {
    const rowsFormArray = this.getRowsFormArray();
    if (rowsFormArray?.length) {
      for (let i = 0; i < rowsFormArray.length; i++) {
        const isEmpty = this.isEmptyObject(rowsFormArray.controls[i].value);
        if (isEmpty) {
          this.removeListItem(i);
          i--;
        }
      }
    }
  }

  getErrorsByFieldName(rowIndex: number, fieldName: string) {
    return (<FormArray>this.getRowsFormArray()?.controls[rowIndex])?.controls[fieldName]?.errors;
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  onEditButtonClick() {
    this.editMode = true;
    this.createInitialEmptyRow();
  }

  onRevertChanges() {
    /* set form items by initial value of form */
    this.setFormItems(this.initialValue);
  }

  onFormSubmit() {
    const formValue = this.form.value;
    if (this.form.valid) {
      /* set value & trigger changes */
      this.value = formValue?.rows;
      this.initialValue = cloneDeep(this.value);
      this.formSubmit.emit(formValue);
      this.editMode = false;
    }
  }

}
