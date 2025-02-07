import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { CodeEditorComponent } from '@rapider/angular-components/code-editor';

@Component({
  selector: 'rappider-json-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RappiderButtonComponent,
    CodeEditorComponent
  ],
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderJsonInputComponent),
      multi: true
    }
  ]
})
export class RappiderJsonInputComponent implements ControlValueAccessor {

  @Input() editorOptions: any = {
    theme: 'vs-default',
    language: 'json',
    minimap: { autohide: true, enabled: false },
    lineNumbers: { renderType: 0 }
  };

  @Output() blur = new EventEmitter<any>();

  _value: any;
  localeValue: string;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.localeValue = JSON.stringify(this.value);
    this.onChange(value);
    this.onTouched();
    this.blur.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: Record<string, any>): void {
    if (value) {
      this._value = value;
      this.localeValue = JSON.stringify(this.value);
    } else {
      this._value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onCodemirrorValueChange(value) {
    this.localeValue = value;
  }


  onCodemirrorSave() {
    try {
      this.value = JSON.parse(this.localeValue);
    } catch (error) {
      console.error(error);
    }
  }

}
