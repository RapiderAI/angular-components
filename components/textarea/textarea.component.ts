import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { computeBorderStyles } from '@rapider/angular-components/core/style';
import { RappiderTextModule } from '@rapider/angular-components/text';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rappider-textarea',
  standalone: true,
  imports: [FormsModule, NzInputModule, TranslateModule, RappiderTextModule, CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RappiderTextareaComponent)
    }
  ]
})
export class RappiderTextareaComponent implements OnInit, ControlValueAccessor {

  @Input() minRows = 3;
  @Input() maxRows: number;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() placeholder: string;
  @Input() autosize = true;
  @Input() borderSettings: BorderConfig;
  @Input() customSizeSettings: SizeConfig;
  @Input() customColorSettings: ColorConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() typographySettings: TypographyConfig;
  @Input() minLength: number;
  @Input() elementId?: string;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();

  borderStyles: any = {};

  _value: string;

  ngOnInit(): void {
    this.setBorderStyles();
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string) {
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

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }

}
