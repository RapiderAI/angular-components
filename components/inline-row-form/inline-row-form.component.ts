import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEmpty } from 'lodash';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RappiderInputErrorComponent } from '@rapider/angular-components/input-error';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { RappiderInputTemplateComponent } from '@rapider/angular-components/input-template';
import { RowFormColumn } from '@rapider/angular-components/core/row-form';

@Component({
  selector: 'rappider-inline-row-form',
  templateUrl: './inline-row-form.component.html',
  styleUrls: ['./inline-row-form.component.scss'],
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
    RappiderButtonComponent,
    RappiderTextComponent
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderInlineRowFormComponent),
      multi: true,
    }
  ]
})
export class RappiderInlineRowFormComponent implements OnInit, ControlValueAccessor {
  /* orderable */
  @Input() orderable: boolean;
  /* columns */
  @Input() columns: RowFormColumn[];
  @Input() orderNumbersVisibility: boolean;
  @Input() infoMessage: TextComponentConfig;
  @Input() infoMessageIndex: number;
  @Input() singleRow: boolean;

  /* returns KeyValue paired data of the row */
  @Output() rowDataChange = new EventEmitter<KeyValue<string, any>>();
  /* returns nothing, just trigger */
  @Output() rowInsert = new EventEmitter();
  /* returns nothing, just trigger */
  @Output() rowIndexChange = new EventEmitter();
  /* returns deleted row data */
  @Output() rowDelete = new EventEmitter<KeyValue<string, any>>();
  @Output() blur = new EventEmitter();
  @Output() valueChange = new EventEmitter<any[]>();

  _value: any[];

  get value() {
    return this._value;
  }

  set value(value: any[]) {
    if (value !== null) {
      this._value = value;
    } else {
      this._value = [];
    }

    const filteredData = this.filterFormData(this.value);
    this.valueChange.emit(filteredData);

    this.onChange(filteredData);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value) {
    if (value !== null) {
      this._value = value;
    } else {
      this._value = [];
    }
    if (!this.singleRow || (this.singleRow && this.value.length === 0)) {
      this.addEmptyRow();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.addEmptyRow();
  };

  onRowDataChange(data, index: number, fieldName: string) {
    this.value[index][fieldName] = data;
    this.value = [...this.value];

    if (this._value.every(row => Object.values(row).some(column => column))) {
      if (!this.singleRow) {
        this.addEmptyRow();
      }
    }
    this.rowDataChange.emit(data);
  }

  filterFormData(formData: any[]) {
    const hasValue = formData.some(item => !isEmpty(item));

    if (hasValue) {
      formData = formData.filter(item => Object.values(item).some(value => !isEmpty(value)));
    }
    return formData;
  }

  removeItem(index: number) {
    const deletedItem = this.value[index].value;
    this._value.splice(index, 1);

    this.value = [...this.value];

    this.rowDelete.emit(deletedItem);
  }

  lastItemIconVisibility(rowIndex: number) {
    if (rowIndex === this._value.length - 1) {
      return false;
    } else {
      return true;
    }
  }

  addEmptyRow() {
    const fieldNames = this.columns?.map(column => column.fieldName);
    const newRow = fieldNames?.reduce((acc, elem) => {
      acc[elem] = null;
      return acc;
    }, {});

    this._value = [
      ...(this._value || []),
      newRow
    ];
    this.rowInsert.emit();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (this.orderable) {
      if (event.previousIndex !== event.currentIndex) {
        /* move rows */
        moveItemInArray(
          this.value,
          event.previousIndex,
          event.currentIndex
        );
        this.rowIndexChange.emit();
      }
    }
  }

  uniqueValueControl(column: RowFormColumn, value: any) {
    return this.value.filter(row => row[column.fieldName] === value)?.length > 1 && column.unique;
  }

  getVisibleColumns(columns) {
    return columns?.filter(column => column.visible !== false);
  }

  onBlur() {
    this.blur.emit();
  }

}
