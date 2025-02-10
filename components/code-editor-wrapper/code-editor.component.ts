import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { CodeMirrorSettings } from '@rapider/angular-components/core/codemirror';
import { CodeEditorComponent } from '@rapider/angular-components/code-editor';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'rappider-code-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RappiderButtonComponent,
    CodeEditorComponent
  ],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderCodeEditorComponent),
      multi: true
    }
  ]
})
export class RappiderCodeEditorComponent implements ControlValueAccessor {

  @Input() title: string;
  @Input() settings: any;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() additionalButtons: ButtonComponentConfig[];

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() additionalButtonClick = new EventEmitter<ButtonComponentConfig>();

  _value: string;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
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

  onFocusChange(focus: boolean) {
    if (!focus) {
      this.blur.emit();
    }
  }

  onAdditionalButtonClick(button: ButtonComponentConfig) {
    this.additionalButtonClick.emit(button);
  }

}
