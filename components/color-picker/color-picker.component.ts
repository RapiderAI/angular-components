import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'rappider-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  imports:[
    CommonModule,
    FormsModule,
    RappiderButtonComponent,
    NzInputModule,
    ColorPickerModule,
    TranslateModule,
    NgxMaskDirective
  ],
  standalone:true,
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderColorPickerComponent),
      multi: true
    }
  ]
})
export class RappiderColorPickerComponent {

  @Input() height: string;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  /* Button label text shown inside the OK / Apply button ('OK'). */
  @Input() okButtonText = 'Save';
  /* Button label text shown inside the Cancel / Reset button ('Cancel'). */
  @Input() cancelButtonText = 'Cancel';
  /* Additional class for customizing the Cancel / Reset button (''). 'e.g-> 'btn btn-danger btn-xs' */
  @Input() cancelButtonClass: string;
  /* Additional class for customizing the OK / Apply button ('') 'e.g-> 'btn btn-primary btn-xs' */
  @Input() okButtonClass: string;
  /* Show a Cancel / Reset button which resets the color (false). */
  @Input() cancelButtonVisible: boolean;
  /* Show an OK / Apply button which saves the color (false). */
  @Input() okButtonVisible: boolean;
  /* Save currently selected color when user clicks outside (true). */
  @Input() saveClickOutside: boolean;

  @Input() elementId?: string;

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  _value: string;
  colorPickerPatterns = { 'A': { pattern: new RegExp('\[A-Za-z0-9#.,-_() \]') } };
  characterCount = 200;

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

  onBlur(color: string) {
    this.value = color;
    this.blur.emit(this.value);
  }

  maskedInput() {
    return 'A'.repeat(this.characterCount);
  }

  onKeyPress(event: KeyboardEvent) {
    const invalidCharacters = ['^', '@'];
    if (invalidCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }
}
