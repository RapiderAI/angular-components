import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RadioGroupSize, RadioGroupButtonStyle, RadioGroupDirection, RadioGroupOptions } from '@rapider/angular-components/core/radio-group';

@Component({
  selector: 'rappider-radio-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzRadioModule,
    TranslateModule,
    NzToolTipModule,
    RappiderIconComponent
    ],
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderRadioGroupComponent),
      multi: true
    }
  ]
})
export class RappiderRadioGroupComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() options: RadioGroupOptions[];
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() invalidConfigText: string;
  @Input() size: RadioGroupSize;
  @Input() disabled: boolean;
  @Input() title: string;
  @Input() buttonStyle: RadioGroupButtonStyle;
  @Input() direction: RadioGroupDirection;
  @Input() gap: string;
  @Input() initialValue: string;

  @Input() elementId?: string;

  Direction = RadioGroupDirection;

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  _value: string;
  isValid: boolean;

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
    this.initDefaults();
    this.setValue();
    this.checkValidity();
  }

  ngOnChanges() {
    this.initDefaults();
    this.setValue();
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  initDefaults() {
    if (this.disabled == null) {
      this.disabled = false;
    }
    if (!this.buttonStyle) {
      this.buttonStyle = RadioGroupButtonStyle.Outline;
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(event) {
    this.blur.emit(event);
  }

  checkValidity() {
    this.isValid = Array.isArray(this.options);
  }

  setInvalidConfigText() {
    return this.invalidConfigText || 'COMPONENT_LIBRARY_MODULE.INPUTS_MODULE.INVALID_CONFIG';
  }

  setDirection() {
    if (this.direction === RadioGroupDirection.Vertical) {
      return { 'flex-direction': 'column', 'width': '100%' };
    } else {
      return { 'flex-direction': 'row' };
    }
  }

}
