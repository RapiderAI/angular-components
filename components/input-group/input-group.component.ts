import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonComponentConfig } from '../../utils/button/button-component-config.interface';
import { IconComponentConfig } from '../../utils/icon/icon-component-config.interface';
import { TextboxComponentConfig } from '../../utils/textbox/textbox-component-config.interface';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RappiderButtonComponent } from '../button/button.component';
import { RappiderIconComponent } from '../icon/icon.component';
import { RappiderTextboxComponent } from '../textbox/textbox.component';

@Component({
  selector: 'rappider-input-group',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    RappiderIconComponent,
    RappiderTextboxComponent,
    RappiderButtonComponent
  ],
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderInputGroupComponent),
      multi: true
    }
  ]
})
export class RappiderInputGroupComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() prefixText: string;
  @Input() suffixText: string;
  @Input() prefixIcon: IconComponentConfig;
  @Input() suffixIcon: IconComponentConfig;
  @Input() prefixButton: ButtonComponentConfig;
  @Input() suffixButton: ButtonComponentConfig;
  @Input() textbox: TextboxComponentConfig;
  @Input() initialValue: any;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() enterClick = new EventEmitter<void>();
  @Output() iconClick = new EventEmitter();

  _value: string;

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

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.setValue();
  }

  ngOnChanges() {
    this.setValue();
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  onButtonClick(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }

  onEnterClick() {
    this.enterClick.emit();
  }

  onIconClick() {
    this.iconClick.emit();
  }

}
