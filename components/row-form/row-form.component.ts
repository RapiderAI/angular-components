import { Component, OnInit, forwardRef, Input, OnDestroy, EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormArray, ControlValueAccessor } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import * as _ from 'lodash';
import { RappiderInputErrorComponent } from '@rapider/angular-components/input-error';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { RappiderTextboxComponent, TextboxComponentConfig } from '@rapider/angular-components/textbox';
import { RowFormColumn } from '@rapider/angular-components/core/row-form';
import { IconType } from '@rapider/angular-components/core/icon';
import { FormService } from '@rapider/angular-components/core/services';
import { RappiderInputTemplateComponent } from '@rapider/angular-components/input-template';
import { UniqueValidator } from '@rapider/angular-components/core/validators';

@Component({
  selector: 'rappider-row-form',
  templateUrl: './row-form.component.html',
  styleUrls: ['./row-form.component.scss'],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DragDropModule,
    NzInputModule,
    NzButtonModule,
    RappiderInputErrorComponent,
    RappiderInputTemplateComponent,
    NzPopconfirmModule,
    RappiderButtonComponent,
    RappiderTextComponent,
    RappiderHeadingComponent,
    RappiderTextboxComponent
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderRowFormComponent),
      multi: true
    }
  ]
})
export class RappiderRowFormComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  /* orderable */
  @Input() orderable: boolean;
  /* columns */
  @Input() columns: RowFormColumn[];
  /* text of add button */
  @Input() addButton: ButtonComponentConfig;
  @Input() editButton: ButtonComponentConfig;
  @Input() cancelButton: ButtonComponentConfig;
  @Input() saveButton: ButtonComponentConfig;
  @Input() removeListItemButton: ButtonComponentConfig;
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
  isSubmitButtonClicked = false;
  removeListItemIcon = {
    name: 'far fa-trash',
    color: 'var(--text-color)'
  };

  subscriptions: Subscription[];

  initialValue: any;
  _value: any;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createInitialEmptyRow();
    this.initDefaults();
    this.initRowListForm();
    this.onEditButtonClick();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.initRowListForm();
    }
    this.initDefaults();
  }

  initDefaults() {
    if (!this.editButton?.text && !this.editButton?.icon.name) {
      this.editButton = {
        ...this.editButton,
        text: 'Edit'
      };
    }
    if (!this.saveButton?.text && !this.saveButton?.icon.name) {
      this.saveButton = {
        ...this.saveButton,
        text: 'Save'
      };
    }
    if (!this.addButton?.text && !this.addButton?.icon.name) {
      this.addButton = {
        ...this.addButton,
        text: 'Add new row',
        icon: {
          name: 'fa-solid fa-plus',
          type: IconType.FontAwesome
        }
      };
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

  getErrorMessagesByFieldName(rowIndex: number, fieldName: string) {
    const errors = this.getErrorsByFieldName(rowIndex, fieldName);
    let errorMessages = [];
    if (errors) {
      errorMessages = Object.keys(errors).map(errorKey => {
        if (errorKey === 'unique') {
          return 'This field must be unique';
        } else {
          const validators = this.columns.find(column => column.fieldName === fieldName)?.validators;
          const existingValidator = validators?.find(validator => validator.errorKey === errorKey);
          if (existingValidator) {
            return existingValidator.errorMessage;
          }
        }
        return '';
      }).filter(e => e);
    }    

    return errorMessages;
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  onEditButtonClick() {
    this.editMode = true;
    if (this.getRowsFormArray()?.length === 0) {
      this.createInitialEmptyRow();
    }
  }

  onRevertChangesAndCancel() {
    /* set form items by initial value of form */
    this.setFormItems(this.initialValue);
    this.editMode = false;
  }

  onFormSubmit() {
    this.isSubmitButtonClicked = true;
    const formValue = this.form.value;
    if (this.form.valid) {
      /* set value & trigger changes */
      this.value = formValue?.rows;
      this.initialValue = cloneDeep(this.value);
      this.formSubmit.emit(formValue);
      this.blur.emit(formValue);
      this.editMode = false;
      this.isSubmitButtonClicked = false;
    }
  }

}
