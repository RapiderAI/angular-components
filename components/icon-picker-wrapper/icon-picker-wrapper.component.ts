import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderModalComponent } from '@rapider/angular-components/modal';
import { RappiderIconPickerTwoComponent } from '@rapider/angular-components/icon-picker-two';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rappider-icon-picker-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
    RappiderModalComponent,
    RappiderIconPickerTwoComponent,
    FormsModule
  ],
  templateUrl: './icon-picker-wrapper.component.html',
  styleUrls: ['./icon-picker-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderIconPickerWrapperComponent),
      multi: true
    }
  ]
})
export class RappiderIconPickerWrapperComponent {

  iconPickerModalVisibility = false;
  selectedIcon: IconComponentConfig;

  @Output() iconSelect = new EventEmitter<IconComponentConfig>();
  @Output() blur = new EventEmitter<void>();

  _value: IconComponentConfig;

  get value() {
    return this._value;
  }

  set value(value: IconComponentConfig) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.blur.emit();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: IconComponentConfig): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleIconPickerModalVisibility(visibility: boolean) {
    this.iconPickerModalVisibility = visibility;
  }

  getModalButtonConfig(): { changeButton: ButtonComponentConfig; deleteButton?: ButtonComponentConfig } {
    if (this.value) {
      const changeButton: ButtonComponentConfig = {
        text: 'Change Icon',
        icon: {
          name: this.selectedIcon?.name,
          type: this.selectedIcon?.type,
          theme: this.selectedIcon?.theme
        }
      };

      const deleteButton: ButtonComponentConfig = {
        text: 'Remove Icon',
        icon: {
          name: 'fa-regular fa-trash'
        }
      };

      return { changeButton, deleteButton };
    } else {
      const selectButton: ButtonComponentConfig = {
        text: 'Select Icon'
      };

      return { changeButton: selectButton };
    }
  }

  onSelectedIcon(icon: IconComponentConfig) {
    this.selectedIcon = icon;
    this.value = icon;
    this.iconPickerModalVisibility = false;
    this.iconSelect.emit();
  }

  onDeleteIcon() {
    this.value = null;
    this.iconPickerModalVisibility = false;
    this.iconSelect.emit();
  }
}
