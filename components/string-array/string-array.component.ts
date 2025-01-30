import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextComponentConfig } from '@rapider/angular-components/text';

@Component({
  selector: 'rappider-string-array',
  templateUrl: './string-array.component.html',
  styleUrls: ['./string-array.component.scss'],
  imports:[
    CommonModule,
    FormsModule,
    // RappiderInlineRowFormComponent
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderStringArrayComponent),
      multi: true
    }
  ]
})
export class RappiderStringArrayComponent implements ControlValueAccessor {

  @Input() orderable: boolean;
  @Input() orderNumbersVisibility: boolean;
  @Input() infoMessage: TextComponentConfig;
  @Input() infoMessageIndex: number;

  @Output() blur = new EventEmitter<string[]>();

  CONFIG_COLUMNS: RowFormColumn[] = [
    {
      fieldName: 'value',
      typeAndFormat: {
        type: PropertyType.String
      },
      config: {
        placeholder: 'Value'
      }
    }
  ];

  mappedValue: any[];
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
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value) {
    if (value) {
      this.mappedValue = value.map(item => ({
        value: item
      }));
      this._value = value;
    } else {
      this.mappedValue = [];
      this._value = [];
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onValueChange(value: any) {
    this.value = value?.map(item => item.value);
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  onRowDelete(value: any) {
    this.blur.emit(this.value);
  }

}
