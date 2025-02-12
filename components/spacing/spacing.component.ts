import { Component, forwardRef, EventEmitter, Output, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderDimensionSelectComponent } from '@rapider/angular-components/dimension-select';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rappider-spacing',
  standalone: true,
  imports: [
    CommonModule,
    RappiderDimensionSelectComponent,
    RappiderSwitchComponent,
    RappiderButtonComponent,
    FormsModule,
    NzToolTipModule,
    RappiderTextboxComponent
  ],
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderSpacingComponent),
      multi: true
    }
  ]
})
export class RappiderSpacingComponent implements ControlValueAccessor, OnInit {

  @Output() valueChange = new EventEmitter<SpacingConfig>();
  @Output() blur = new EventEmitter<SpacingConfig>();

  lockedIcon: IconComponentConfig = {
    name: 'fa-solid fa-lock',
    size: 'small',
    color: 'var(--text-color)'
  };
  unlockedIcon: IconComponentConfig = {
    name: 'fa-solid fa-unlock',
    size: 'small',
    color: 'var(--text-color)'
  };
  switchChecked = false;
  _value: SpacingConfig;

  get value() {
    return this._value;
  }

  set value(value: SpacingConfig) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    this.initConfig();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: SpacingConfig): void {
    if (!value) {
      this.initConfig();
    } else {
      this._value = value;
    }
  }

  switchValueChange() {
    this.switchChecked = !this.switchChecked;
  }

  triggerValueChange() {
    if (this.switchChecked) {
      this.value.all = this.setValueConfig();
    }
    this.value = { ...this.value };
    this.blur.emit(this.value);
    this.valueChange.emit(this.value);
  }

  setValueConfig() {
    return this.value?.top + ' '
      + this.value?.left + ' '
      + this.value?.bottom + ' '
      + this.value?.right;
  }

  initConfig() {
    this.value = {
      all: '',
      top: '',
      right: '',
      bottom: '',
      left: ''
    };
  }
}
