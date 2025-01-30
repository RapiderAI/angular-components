import { Component, EventEmitter, forwardRef, Input, OnInit, Output, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FormsModule } from '@angular/forms';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { TimePickerFormat } from '@rapider/angular-components/core/time-picker';

@Component({
  selector: 'rappider-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NzTimePickerModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderTimePickerComponent),
      multi: true
    }
  ]
})
export class RappiderTimePickerComponent implements ControlValueAccessor, OnInit {

  /**
   * format selection input of the Time Picker Component
   * Default -> HourMinuteSecond = 'HH:mm:ss'
   * HourMinute = 'HH:mm'
   *
   * @memberof RappiderTimePickerComponent
   */
  @Input() format = TimePickerFormat.HourMinuteSecond;
  @Input() borderSettings: BorderConfig;
  @Input() customSizeSettings: SizeConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() colorSettings: ColorConfig;
  @Input() typography: TypographyConfig;

  @Input() elementId?: string;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<Date>();
  @Output() valueChange = new EventEmitter<Date>();

  @HostBinding('style.--time-picker-font-size') fontSize;
  @HostBinding('style.--time-picker-font-weight') fontWeight;
  @HostBinding('style.--time-picker-font-style') fontStyle;
  @HostBinding('style.--time-picker-text-decaration') textDecoration;
  @HostBinding('style.--time-picker-text-align') textAlign;
  @HostBinding('style.--time-picker-text-shadow') textShadow;
  @HostBinding('style.--time-picker-font-family') fontFamily;
  @HostBinding('style.--time-picker-font-stretch') fontStretch;
  @HostBinding('style.--time-picker-text-indent') textIndent;
  @HostBinding('style.--time-picker-letter-spacing') letterSpacing;
  @HostBinding('style.--time-picker-line-height') lineHeight;
  @HostBinding('style.--time-picker-word-spacing') wordSpacing;
  @HostBinding('style.--time-picker-text-transform') textTransform;
  @HostBinding('style.--time-picker-user-select') userSelect;

  _value: Date;

  get value() {
    return this._value;
  }

  set value(value: Date) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    if (this.typography) {
      this.setTextConfig();
    }
  }

  writeValue(value): void {
    if (value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTimeChange(value: Date) {
    this.blur.emit(value);
  }

  setTextConfig() {
    this.fontSize = this.typography?.fontSize;
    this.fontWeight = this.typography?.fontWeight;
    this.fontStyle = this.typography?.fontStyle;
    this.textDecoration = this.typography?.textDecoration;
    this.textAlign = this.typography?.textAlign;
    this.textShadow = this.typography?.textShadow;
    this.fontFamily = this.typography?.fontFamily;
    this.fontStretch = this.typography?.fontStretch;
    this.textIndent = this.typography?.textIndent;
    this.letterSpacing = this.typography?.letterSpacing;
    this.lineHeight = this.typography?.lineHeight;
    this.wordSpacing = this.typography?.wordSpacing;
    this.textTransform = this.typography?.textTransform;
    this.userSelect = this.typography?.userSelect;
  }
}
