import { Component, forwardRef, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { BoxShadowConfig, ColorConfig } from '@rapider/angular-components/core/style';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { SwitchSize, SwitchTextPosition } from '@rapider/angular-components/core/switch';

@Component({
  selector: 'rappider-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  imports: [
    CommonModule,
    NzSwitchModule,
    FormsModule,
    RappiderTextComponent,
    RappiderIconComponent,
    NzToolTipModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderSwitchComponent),
      multi: true
    }
  ]
})
export class RappiderSwitchComponent implements ControlValueAccessor, OnInit {

  /* disable state */
  @Input() disabled: boolean;
  /* loading state */
  @Input() loading: boolean;
  /* size options  small or default */
  @Input() size: SwitchSize = SwitchSize.Default;
  @Input() text: TextComponentConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() textPosition?: SwitchTextPosition = SwitchTextPosition.Right;
  @Input() icon: IconComponentConfig;
  @Input() tooltipText: string;
  @Input() checkedChildren: string;
  @Input() unCheckedChildren: string;

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() blur = new EventEmitter<boolean>();

  @HostBinding('style.--switch-background-color') switchBackgroundColor;
  @HostBinding('style.--switch-checked-background-color') checkedSwitchBackgroundColor;

  @HostBinding('style.--switch-box-shadow') boxShadow;

  _value: boolean;

  get value() {
    return this._value;
  }

  set value(value: boolean) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() {
    this.setColorConfig();
    if (this.boxShadowSettings) {
      this.boxShadow = this.boxShadowSettings?.boxShadow;
    }
  }

  writeValue(value: boolean) {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: boolean) {
    this.blur.emit(value);
  }

  setColorConfig() {
    if (this.colorSettings) {
      this.switchBackgroundColor = this.colorSettings?.backgroundColor;
      this.checkedSwitchBackgroundColor = this.colorSettings?.color;
    } else {
      this.switchBackgroundColor = 'var(--component-header-background-color)';
      this.checkedSwitchBackgroundColor = 'var(--primary-color)';
    }
  }

}
