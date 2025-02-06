import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectSettings } from '@rapider/angular-components/core/select';
import { toInteger } from 'lodash';
import { DimensionType } from '@rapider/angular-components/core/dimension-select';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'rappider-dimension-select',
  standalone: true,
  imports: [CommonModule, FormsModule, RappiderNumberInputComponent, RappiderSelectComponent, NzInputModule],
  templateUrl: './dimension-select.component.html',
  styleUrls: ['./dimension-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderDimensionSelectComponent),
      multi: true
    }
  ]
})
export class RappiderDimensionSelectComponent implements OnInit, ControlValueAccessor {

  @Input() disabled: boolean;

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  _value: string;
  /* local number value */
  number: number | string = null;
  /* local type value */
  type: string = DimensionType.PX;

  selectOptions: KeyValue<string, string>[] = [];
  selectSettings: SelectSettings = {
    allowClear: false,
    searchable: false
  };
  DimensionType = DimensionType;

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
    this.getSelectOptions();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string) {
    this._value = value;
    this.getNumberAndType(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  getMergedValue() {
    return `${this.number || 0}${this.type || ''}`;
  }

  getNumberAndType(value: string) {
    if (value) {
      this.type = value.match(/[a-zA-Z%]+/g)?.[0].toString();
      if (!(this.type === 'em' || this.type === 'rem')) {
        this.number = toInteger(value.match(/\d+/g)?.[0]);
      } else {
        this.number = value.match(/\d+/g)?.[0];
      }
    } else {
      this.number = null;
    }
  }

  getSelectOptions() {
    this.selectOptions = Object.values(DimensionType).map(element => ({
      key: element,
      value: element
    }));
  }

  numberOrTypeValueChange() {
    this.value = this.getMergedValue();
  }

}
