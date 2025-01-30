import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnChanges, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NzMarks, NzSliderComponent } from 'ng-zorro-antd/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { SliderHandleType } from '@rapider/angular-components/core/slider';


@Component({
  selector: 'rappider-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NzSliderComponent,
    RappiderButtonComponent,
    NzGridModule,
    RappiderNumberInputComponent
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderSliderComponent),
      multi: true
    }
  ]
})
export class RappiderSliderComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() dualMode: boolean;
  @Input() minRange: number;
  @Input() maxRange: number;
  @Input() marks: NzMarks;
  @Input() step: number;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() handleType: SliderHandleType;
  @Input() readonly: boolean;
  @Input() colorSettings: ColorConfig;
  @Input() customMax = false;
  @Input() isRangeVisible: boolean;

  @Output() blur = new EventEmitter<number | number[]>();
  @Output() valueChange = new EventEmitter<number | number[]>();

  @HostBinding('style.--slider-background-color') backgroundColor;
  @HostBinding('style.--slider-border-color') sliderColor;

  SliderHandleType = SliderHandleType;

  tempMaxValue: number;
  buttonVisibility = true;
  textboxVisibility = false;
  customMaxValue: number;

  _value: number | number[];

  get value() {
    return this._value;
  }

  set value(value: number | number[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
    this.initDefaults();
    this.tempMaxValue = this.maxRange;
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (this.dualMode == null) {
      this.dualMode = false;
    }
    if (this.readonly == null) {
      this.readonly = false;
    }
    if (this.minRange == null) {
      this.minRange = 0;
    }
    if (this.maxRange == null) {
      this.maxRange = 10;
    }
    if (this.step == null) {
      this.step = 1;
    }
    if (this.marks == null || (this.marks.hasOwnProperty('key') && this.marks['key'] == null)
    ) {
      this.marks = {};
    }
    this.setColorSettings();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  setColorSettings() {
    if (this.colorSettings) {
      this.backgroundColor = this.colorSettings?.backgroundColor;
      this.sliderColor = this.colorSettings?.color;
    } else {
      // ng-zorro default silder rail color
      this.backgroundColor = '#edededcc';
      this.sliderColor = 'var(--primary-color)';
    }
  }

  changeVisibility(event: any) {
    if (this.textboxVisibility) {
      this.maxRange = !this.customMaxValue ? this.maxRange : this.customMaxValue;
      if (this.dualMode) {
        this.value = [this.minRange, this.maxRange];
        if (Object.keys(this.marks).length !== 0) {
          this.updateMarks(Number(this.value[0]), Number(this.value[1]), Number(this.tempMaxValue));
        }
      } else {
        if (Object.keys(this.marks).length !== 0) {
          this.value = this.minRange;
          this.updateMarks(Number(this.minRange), Number(this.maxRange), Number(this.tempMaxValue));
        }
      }
    }
    this.textboxVisibility = !this.textboxVisibility;
  }

  customMaxChange(customMax: number) {
    this.customMaxValue = customMax;
  }

  updateMarks(min: number, max: number, tempMax: number) {
    const oldMax = tempMax;
    const newMax = max;

    const scaleRatio = newMax / oldMax;

    const updatedMarks = {};

    for (const key in this.marks) {
      if (Object.hasOwnProperty.call(this.marks, key)) {
        const scaledKey = Math.round(Number(key) * scaleRatio);
        updatedMarks[String(scaledKey)] = `$${scaledKey}`;
      }
    }

    this.marks = updatedMarks;
    this.tempMaxValue = newMax;
  }
}
