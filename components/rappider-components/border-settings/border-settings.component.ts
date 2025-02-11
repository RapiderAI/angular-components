import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { RappiderSelectComponent, SelectComponentConfig } from '@rapider/angular-components/select';
import { BorderConfig, BorderStyle } from '@rapider/angular-components/core/style';
import { CommonModule } from '@angular/common';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RappiderColorPickerComponent } from '@rapider/angular-components/color-picker';
import { RappiderDimensionSelectComponent } from '@rapider/angular-components/dimension-select';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';

@Component({
  selector: 'rappider-border-settings',
  standalone: true,
  imports: [
    CommonModule,
    RappiderTextboxComponent,
    RappiderSwitchComponent,
    RappiderDimensionSelectComponent,
    RappiderColorPickerComponent,
    RappiderSelectComponent,
    FormsModule,
    RappiderButtonComponent,
    NzToolTipModule
  ],
  templateUrl: './border-settings.component.html',
  styleUrls: ['./border-settings.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderBorderSettingsComponent),
      multi: true
    }
  ]
})
export class RappiderBorderSettingsComponent implements OnInit, ControlValueAccessor {

  @Output() valueChange = new EventEmitter<BorderConfig>();
  @Output() blur = new EventEmitter<BorderConfig>();

  borderStyleOptions: SelectComponentConfig = {
    options: Object.entries(BorderStyle).map(([key, value]) => ({ key: key, value }))
  };
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

  borderIndividualSidesVisible = false;
  radiusIndividualBordersVisible = false;

  _value: BorderConfig;

  get value() {
    return this._value;
  }

  set value(value: BorderConfig) {
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

  writeValue(value: BorderConfig): void {
    if (!value) {
      this.initBorderConfig();
    } else {
      this._value = value;
    }
    this.checkBorderAndRadiusIndividualSidesVisible();
  }

  ngOnInit(): void {
    this.initBorderConfig();
  }

  switchValueChange(switchValue, changedField: string) {
    if (changedField === 'width') {
      this.borderIndividualSidesVisible = !this.borderIndividualSidesVisible;
      if (switchValue) {
        this.value.border = null;
      } else {
        this.value.borderTop = null;
        this.value.borderRight = null;
        this.value.borderBottom = null;
        this.value.borderLeft = null;
        this.value.borderColor = null;
        this.value.borderStyle = null;
      }
    }
    if (changedField === 'radius') {
      this.radiusIndividualBordersVisible = !this.radiusIndividualBordersVisible;
      if (switchValue) {
        this.value.borderRadius = null;
      } else {
        this.value.borderTopLeftRadius = null;
        this.value.borderTopRightRadius = null;
        this.value.borderBottomLeftRadius = null;
        this.value.borderBottomRightRadius = null;
      }
    }
    this.triggerValueChange();
  }

  triggerValueChange() {
    this.value = { ...this.value };
    this.blur.emit(this.value);
  }

  checkBorderAndRadiusIndividualSidesVisible() {
    if (this.value.border) {
      this.borderIndividualSidesVisible = false;
    } else {
      this.borderIndividualSidesVisible = (
        this.value.borderTop ||
        this.value.borderRight ||
        this.value.borderBottom ||
        this.value.borderLeft
      ) ? true : this.borderIndividualSidesVisible;
    }

    if (this.value.borderRadius) {
      this.radiusIndividualBordersVisible = false;
    } else {
      this.radiusIndividualBordersVisible = (
        this.value.borderTopLeftRadius ||
        this.value.borderTopRightRadius ||
        this.value.borderBottomLeftRadius ||
        this.value.borderBottomRightRadius
      ) ? true : this.radiusIndividualBordersVisible;
    }
  }

  initBorderConfig() {
    this.value = {
      border: null,
      borderColor: null,
      borderStyle: null,
      borderRadius: null,
      borderTop: null,
      borderRight: null,
      borderBottom: null,
      borderLeft: null,
      borderTopLeftRadius: null,
      borderTopRightRadius: null,
      borderBottomLeftRadius: null,
      borderBottomRightRadius: null
    };
  }

}
