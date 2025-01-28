import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BorderConfig, BoxShadowConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';
import { CheckboxType } from '@rapider/angular-components/core/checkbox';

@Component({
  selector: 'rappider-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzToolTipModule,
    NzCheckboxModule,
    TranslateModule,
    RappiderIconComponent,
    RappiderTextComponent
  ],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderCheckboxComponent),
      multi: true
    }
  ]
})
export class RappiderCheckboxComponent implements ControlValueAccessor {

  @Input() text: TextComponentConfig;
  @Input() icon: IconComponentConfig;
  @Input() disabled = false;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() checkboxType: CheckboxType;
  @Input() tooltip: string;
  @Input() additionalIcon: IconComponentConfig;

  @Input() borderSettings: BorderConfig;
  @Input() customSizeSettings: SizeConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;

  @Input() elementId?: string;

  @Output() blur = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<boolean>();

  CheckboxType = CheckboxType;

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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: boolean) {
    this.blur.emit(value);
  }

  writeValue(val: boolean) {
    this._value = val;
  }
}