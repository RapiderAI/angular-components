import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { BoxShadowConfig, ShadowType } from '@rapider/angular-components/core/style';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderDimensionSelectComponent } from '@rapider/angular-components/dimension-select';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';
import { RappiderColorPickerComponent } from '@rapider/angular-components/color-picker';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rappider-shadow-settings',
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
    RappiderTextboxComponent,
    RappiderDimensionSelectComponent,
    RappiderColorPickerComponent,
    RappiderSwitchComponent,
    FormsModule,
    NzToolTipModule,
    TranslateModule
  ],
  templateUrl: './shadow-settings.component.html',
  styleUrls: ['./shadow-settings.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderShadowSettingsComponent),
      multi: true
    }
  ]
})
export class RappiderShadowSettingsComponent implements OnInit, ControlValueAccessor {

  @Output() valueChange = new EventEmitter<BoxShadowConfig>();
  @Output() blur = new EventEmitter<BoxShadowConfig>();

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
  checkedSwitchTooltipTitle = 'Switch to enable shadow settings details';
  uncheckedSwitchTooltipTitle = 'Switch to disable shadow settings details';

  individualSidesVisible = false;

  _value: BoxShadowConfig;

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: BoxShadowConfig): void {
    if (!value) {
      this.initShadowConfig();
    } else {
      this._value = value;
    }
  }

  ngOnInit(): void {
    this.initShadowConfig();
  }

  switchValueChange() {
    this.individualSidesVisible = !this.individualSidesVisible;
  }

  triggerValueChange() {
    if (this.individualSidesVisible) {
      this.value.boxShadow = this.setShadowConfig();
    }
    this.value = { ...this.value };
    this.blur.emit(this.value);
  }

  setShadowConfig() {
    return this.value?.horizontalLength + ' '
      + this.value?.verticalLength + ' '
      + this.value?.boxShadowBlur + ' '
      + this.value?.boxShadowSpread + ' '
      + this.value?.shadowColor + ' '
      + (this.value?.inset ? ShadowType.Inset : '');
  }

  initShadowConfig() {
    this.value = {
      boxShadow: '',
      horizontalLength: '',
      verticalLength: '',
      boxShadowSpread: '',
      boxShadowBlur: '',
      shadowColor: ''
    };
  }
}
