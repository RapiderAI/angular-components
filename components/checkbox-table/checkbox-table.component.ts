import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { CheckboxTableCheck, CheckboxTableColumnTitlePlacement, CheckboxTableItemPlacement, CheckboxTableItems, CheckboxTableRowTitlePlacement } from '@rapider/angular-components/core/checkbox-table';

@Component({
  selector: 'rappider-checkbox-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCheckboxModule,
    RappiderTextComponent
  ],
  templateUrl: './checkbox-table.component.html',
  styleUrls: ['./checkbox-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderCheckboxTableComponent),
      multi: true
    }
  ]
})
export class RappiderCheckboxTableComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() checkboxMode: boolean;
  @Input() rows: CheckboxTableItems[];
  @Input() columns: CheckboxTableItems[];
  @Input() check: CheckboxTableCheck[];
  @Input() rowTitlePlacement: CheckboxTableRowTitlePlacement;
  @Input() columnTitlePlacement: CheckboxTableColumnTitlePlacement;
  @Input() itemPlacement: CheckboxTableItemPlacement;

  @Output() valueChange = new EventEmitter<CheckboxTableCheck[]>();

  _value: CheckboxTableCheck[] = [];

  get value() {
    return this._value;
  }

  set value(value: CheckboxTableCheck[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this._value = value;
    if (value?.check?.length as any) {
      value.check.forEach(val => {
        this.onCheckboxValueChange(val, val.check);
      });
    }
  }

  ngOnInit(): void {
    if (!this.check) {
      this.check = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['check']) {
      if (this.check && !this.check?.length) {
        this.check = [this.check] as any;
      }
    }
  }

  getColumn(row, column) {
    let findedColumn = this.check?.find(checkValue => checkValue.row === row.value && checkValue.column === column.value);
    if (!findedColumn) {
      findedColumn = {
        row: row.value,
        column: column.value,
        check: null
      };
      this.check?.push(
        findedColumn
      );
    }
    return findedColumn;
  }

  getCheckArray(data: any): any[] {
    let currentData = data;

    while (currentData && currentData.check) {
      if (currentData?.check?.length) {
        currentData = currentData.check;
      } else {
        return [];
      }
    }

    return currentData?.length ? currentData : [];
  }

  getCheck(row, column, value) {
    let findedColumn = this.getCheckArray(value)?.find(checkValue => checkValue.row === row.value && checkValue.column === column.value) ||
      this.check?.find(checkValue => checkValue.row === row.value && checkValue.column === column.value);

    if (!findedColumn) {
      findedColumn = {
        row: row.value,
        column: column.value,
        check: null
      };
      this.check?.push(
        findedColumn
      );
    }
    return findedColumn;
  }

  onCheckboxValueChange(checkboxTableValue, isChecked) {
    if (!this.check) {
      this.check = [];
    }

    const updatedCheckboxValue = {
      ...checkboxTableValue,
      check: isChecked
    };

    if (this.getCheckArray(this.value)?.length && this.check?.length) {
      this.check = [
        ...this.check,
        ...this.getCheckArray(this.value)
      ];
    }

    this.check = this.check.filter((item, index, array) =>
      array.indexOf(item) === index
    );

    this.check = this.check?.filter(checkboxValue =>
      !(checkboxValue.row === updatedCheckboxValue.row &&
        checkboxValue.column === updatedCheckboxValue.column)
    );

    this.check = [
      ...this.check,
      updatedCheckboxValue
    ];

    this.value = this.check?.filter(item => item.check === true);
  }

}
