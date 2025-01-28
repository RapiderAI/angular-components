import { Component, OnInit, Input, forwardRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BorderConfig, BoxShadowConfig, ColorConfig, computeBorderStyles, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { TextBoxType, TextBoxSize } from '@rapider/angular-components/core/textbox';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';


@Component({
  selector: 'rappider-textbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzMentionModule,
    TranslateModule,
    NgxMaskDirective
  ],
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderTextboxComponent),
      multi: true
    }
  ]
})
export class RappiderTextboxComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() type: TextBoxType;
  @Input() mask: string;
  @Input() maskGuide: boolean;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() mentionSupported: boolean;
  @Input() mentionPrefix = '#';
  @Input() mentionValues: any;
  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() typographySettings: TypographyConfig;
  @Input() size: TextBoxSize;
  @Input() showMaskTyped: boolean;
  @Input() dropSpecialCharacters: boolean;
  @Input() autoFocus: boolean;
  @Input() elementId: string;
  @Input() autocomplete: string;
  @Input() initialValue: string;

  @Output() blur = new EventEmitter<string>();
  @Output() focus = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() enterClick = new EventEmitter<void>();

  borderStyles: any = {};

  _value: string;

  /* Ng zorro mention component */
  valueWith = (data: { value: string }) => data.value;

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
    this.initDefaults();
    this.setValue();
    this.setBorderStyles();
  }

  ngOnChanges() {
    this.setValue();
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

  onFocus() {
    this.focus.emit(this.value);
  }

  initDefaults() {
    if (!this.maskGuide) {
      this.maskGuide = false;
    }
    if (!this.type) {
      this.type = TextBoxType.Text;
    }
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  onEnterClick() {
    this.enterClick.emit();
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }

}
