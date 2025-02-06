import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { inputSettingsDropdownConfig, InputSettingsDropdownOptions, PropertyFormat, PropertyType, SupportedFormats, SupportedTypes } from '@rapider/angular-components/core/input-template';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RappiderTagComponent } from '@rapider/angular-components/tag';
import { RappiderDropdownMenuComponent } from '@rapider/angular-components/dropdown-menu';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderCheckboxComponent } from '@rapider/angular-components/checkbox';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
import { RappiderDatePickerComponent } from '@rapider/angular-components/date-picker';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { CodeEditorComponent } from '@rapider/angular-components/code-editor';
import { InputTemplateTypeAndFormat } from './utils';

@Component({
  selector: 'rappider-input-template',
  templateUrl: './input-template.component.html',
  styleUrls: ['./input-template.component.scss'],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RappiderTextboxComponent,
    RappiderDatePickerComponent,
    RappiderNumberInputComponent,
    RappiderCheckboxComponent,
    CodeEditorComponent,
    RappiderSelectComponent,
    RappiderSwitchComponent,
    RappiderDropdownMenuComponent,
    RappiderTagComponent,
    NzInputModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderInputTemplateComponent),
      multi: true
    }
  ]
})
export class RappiderInputTemplateComponent implements ControlValueAccessor, OnChanges {
  @Input() typeAndFormat: InputTemplateTypeAndFormat;
  /* flag for whether showing codemirror or textbox for arrays and objects */
  @Input() showCodemirrorForObjectAndArray: boolean;
  @Input() config: any;
  @Input() isInputOptionsVisible = false;

  @Output() valueChange = new EventEmitter<any>();
  @Output() blur = new EventEmitter();

  isTypeAndFormatSupported: boolean;
  type = PropertyType.String;

  _value: any;

  PropertyType = PropertyType;
  PropertyFormat = PropertyFormat;
  SupportedTypes = SupportedTypes;
  CODEMIRROR_JSON_SETTINGS = {
    language: 'json',
    minimap: { autohide: true, enabled: false },
    lineNumbers: { renderType: 0 }
  };
  inputSettingsDropdownConfig = inputSettingsDropdownConfig;
  InputSettingsDropdownOptions = InputSettingsDropdownOptions;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeAndFormat']) {
      this.checkIfTypeAndFormatSupported(changes['typeAndFormat'].currentValue);
    }    
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(this.value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  checkIfTypeAndFormatSupported(typeAndFormat: any) {
    if (typeAndFormat?.type) {
      this.type = typeAndFormat.type;
    }

    if (typeAndFormat?.format) {
      this.isTypeAndFormatSupported = this.SupportedTypes.includes(typeAndFormat?.type)
        && SupportedFormats.includes(typeAndFormat?.format);
    } else {
      this.isTypeAndFormatSupported = this.SupportedTypes.includes(typeAndFormat?.type);
    }

    if (typeAndFormat.type === PropertyType.Object) {
      this.CODEMIRROR_JSON_SETTINGS = {
        ...this.CODEMIRROR_JSON_SETTINGS,
        language: 'json'
      };
    } else if (typeAndFormat.type === PropertyType.Array) {
      this.CODEMIRROR_JSON_SETTINGS = {
        ...this.CODEMIRROR_JSON_SETTINGS,
        language: 'typescript'
      };
    }
  }

  onInputSettingsDropdownItemClick(data) {
    if (data.key === InputSettingsDropdownOptions.SetAsNull) {
      this.typeAndFormat = {
        type: PropertyType.Null
      };
      this.inputSettingsDropdownConfig = {
        ...this.inputSettingsDropdownConfig,
        items: [
          {
            label: 'Edit Value',
            key: 'editValue'
          }
        ]
      };
      this.value = null;
    } else if (data.key === InputSettingsDropdownOptions.EditValue) {
      this.typeAndFormat = {
        type: this.type
      };
      this.inputSettingsDropdownConfig = inputSettingsDropdownConfig;
      this.value = this.getInitValue(this.type);
    }
  }

  getInitValue(type: PropertyType) {
    switch (type) {
      case PropertyType.String:
        return '';
      case PropertyType.Number:
        return 0;
      case PropertyType.Boolean:
        return false;
      case PropertyType.Array:
        return [];
      case PropertyType.Object:
        return {};
      case PropertyType.Null:
        return null;
      case PropertyType.Integer:
        return 0;
      case PropertyType.Date:
        return '';
      case PropertyType.Enum:
        return '';
      default:
        return null;
    }
  }

  onBlur() {
    this.blur.emit();
  }
}
