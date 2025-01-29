import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { isDate } from 'moment';
import { CommonModule } from '@angular/common';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox'
import { TranslateModule } from '@ngx-translate/core';
import { DateFormat, DatePickerDateMode, DateSplitter } from '@rapider/angular-components/core/date-picker';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';

@Component({
  selector: 'rappider-date-picker',
  templateUrl: './date-picker.component.html',
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerComponent,
    RappiderTextboxComponent,
    TranslateModule,
  ],
  standalone: true,
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderDatePickerComponent),
      multi: true
    }
  ]
})
export class RappiderDatePickerComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() minSelectableDate: Date;
  @Input() maxSelectableDate: Date;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() placeholder: string;
  @Input() dateMode: DatePickerDateMode;
  @Input() boxBorder: boolean;
  @Input() borderSettings: BorderConfig;
  @Input() customSizeSettings: SizeConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() colorSettings: ColorConfig;
  @Input() typography: TypographyConfig;
  @Input() dateFormat: DateFormat = DateFormat.YearMonthDay;
  @Input() splitter: DateSplitter = DateSplitter.Dash;
  @Input() showTime: boolean;
  @Input() showWeekNumber: boolean;
  @Input() timeRangeMode: boolean;
  @Input() inline: boolean;
  @Input() initialValue: Date;

  @Input() elementId?: string;

  @Output() blur = new EventEmitter<Date | Date[]>();
  @Output() valueChange = new EventEmitter<Date | Date[]>();

  // for date-picker
  _value: Date | Date[];

  format: string;
  mask: string;
  DateMode = DatePickerDateMode;

  get value() {
    return this._value;
  }

  set value(value: Date | Date[]) {
    this.setDateValue(value);
    this.onChange(this._value);
    this.onTouched();
    this.blur.emit(this._value);
    this.valueChange.emit(this._value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    if (this.dateFormat) {
      this.format = this.dateFormat.replace(/[^a-zA-Z0-9]/g, this.splitter);
    }
    if (this.initialValue) {
      this._value = this.initialValue;
    }
    this.createMask();
    this.initDefault();
    this.setValue();
  }

  ngOnChanges() {
    this.initDefault();
    this.setValue();
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  initDefault() {
    if (!this.dateMode) {
      this.dateMode = DatePickerDateMode.Date;
    }
    if (!this.dateFormat) {
      // for US as default
      this.dateFormat = DateFormat.MonthDayYear;
    }
    if (!this.splitter) {
      // (/) as default
      this.splitter = DateSplitter.Slash;
    }
  }

  writeValue(value): void {
    this.setDateValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDateValue(value: Date | string | Date[]) {
    if (value && typeof value === 'string') {
      const localeDateValue = new Date(value);
      if (isDate(localeDateValue) && !isNaN(localeDateValue.getTime())) {
        this._value = localeDateValue;
      } else {
        this._value = null;
      }
    } else {
      this._value = value as Date | Date[];
    }
  }

  /** Checks if there is boundry for date picking,if so disables the unpickable dates */
  disabledDate = (current: Date): boolean => {
    const minCondition = differenceInCalendarDays(this.minSelectableDate, current) > 0;
    const maxCondition = differenceInCalendarDays(current, this.maxSelectableDate) > 0;

    /* Checks if there is both min and max condition */
    if (this.minSelectableDate && this.maxSelectableDate) {
      return !(!minCondition && !maxCondition);
    } else if (this.minSelectableDate) { /* Checks for min condition */
      return minCondition;
    } else if (this.maxSelectableDate) { /* Checks for max condition */
      return maxCondition;
    }
    return false;
  };

  /**
   * Mask selection according to dateFormat and splitter
   */
  createMask() {
    if (this.dateFormat === DateFormat.MonthDayYear) {
      // M0/d0/0000
      this.mask = `M0${this.splitter}d0${this.splitter}0000`;
    } else if (this.dateFormat === DateFormat.DayMonthYear) {
      // d0/M0/0000
      this.mask = `d0${this.splitter}M0${this.splitter}0000`;
    } else if (this.dateFormat === DateFormat.YearMonthDay) {
      // 0000/M0/d0
      this.mask = `0000${this.splitter}M0${this.splitter}d0`;
    }
  }

}
