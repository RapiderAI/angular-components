import { Component, OnInit, Input, Output, EventEmitter, forwardRef, HostBinding, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BoxShadowConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RadioDirection, radioSelectedIconConfig } from '@rapider/angular-components/core/radio';
import { SelectableOption } from '@rapider/angular-components/core/common';


@Component({
  selector: 'rappider-radio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzRadioModule,
    TranslateModule,
    NzToolTipModule,
    RappiderTextComponent,
    RappiderIconComponent
  ],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderRadioComponent),
      multi: true
    }
  ]
})
export class RappiderRadioComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() options: SelectableOption[];
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() invalidConfigText: TextComponentConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() color: string;
  @Input() width: string;
  @Input() height: string;
  @Input() showOptionsAsButtons?: boolean = false;
  @Input() direction: RadioDirection;
  @Input() showSelectedIcon?: boolean = false;
  @Input() initialValue: any;

  @Input() elementId?: string;

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  @HostBinding('style.--radio-color') radioColor;
  @HostBinding('style.--radio-height') radioHeight;
  @HostBinding('style.--radio-width') radioWidth;
  @HostBinding('style.--radio-shadow') radioShadow;

  _value: string;
  isValid: boolean;
  Direction = RadioDirection;
  radioSelectedIconConfig = radioSelectedIconConfig;

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
    this.checkValidity();
    this.setValue();
    this.setRadioConfig();
  }

  ngOnChanges() {
    this.setValue();
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

  onValueChange(value: string) {
    this.blur.emit(value);
  }

  checkValidity() {
    this.isValid = Array.isArray(this.options);
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  setInvalidConfigText() {
    return this.invalidConfigText || 'COMPONENT_LIBRARY_MODULE.INPUTS_MODULE.INVALID_CONFIG';
  }

  setRadioConfig() {
    if (this.color) {
      this.radioColor = this.color;
    }
    if (this.width) {
      this.radioWidth = this.width;
    }
    if (this.height) {
      this.radioHeight = this.height;
    }
    if (this.shadowSettings) {
      this.radioShadow = this.shadowSettings?.boxShadow;
    }
    if (!this.height || this.height === '0px') {
      // default ng-zorro value
      this.radioHeight = '16px';
    }
    if (!this.width || this.width === '0px') {
      // default ng-zorro value
      this.radioWidth = '16px';
    }
    if (!this.color) {
      this.radioColor = 'var(--primary-color)';
    }
  }
}