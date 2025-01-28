import { Component, OnInit, Input, EventEmitter, Output, forwardRef, HostBinding, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { isNumber } from 'lodash';
import { BorderConfig, BoxShadowConfig, ColorConfig, computeBorderStyles, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';


@Component({
  selector: 'rappider-number-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputNumberModule
  ],
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderNumberInputComponent),
      multi: true
    }
  ]
})
export class RappiderNumberInputComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() step: number | string = 1;
  @Input() max: number;
  @Input() min: number;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() borderSettings: BorderConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() initialValue: number;

  @Input() elementId?: string;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<number>();
  @Output() valueChange = new EventEmitter<number>();

  @HostBinding('style.--number-input-background-color') backgroundColor;

  borderStyles: any = {};

  _value: number;

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    if (this.colorSettings) {
      this.backgroundColor = this.colorSettings?.backgroundColor;
    } else {
      this.backgroundColor = 'var(--input-background-color)';
    }
    this.setValue();
    this.setBorderStyles();
  }

  ngOnChanges() {
    this.setValue();
  }

  writeValue(value: string | number): void {
    this._value = isNumber(value) ? Number(value) : null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }
}