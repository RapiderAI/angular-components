import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ModalTypes } from './utils/custom-function-modal-type.enum';
import { ActionMode } from './utils/action-mode.enum';
import { VALIDATORS_PATTERN_FORM_CONFIG_WITH_VALUE, VALIDATORS_PATTERN_FORM_CONFIG_WITHOUT_VALUE, VALIDATORS_PATTERN_CONFIG } from './utils/validators-pattern-config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rappider-validators-pattern-tab-list-wrapper',
  templateUrl: './validators-pattern-tab-list-wrapper.component.html',
  styleUrls: ['./validators-pattern-tab-list-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => ValidatorsPatternTabListWrapperComponent),
      multi: true
    }
  ]
})
export class ValidatorsPatternTabListWrapperComponent implements ControlValueAccessor {

  @Output() blur = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  validatorsPatternConfig = VALIDATORS_PATTERN_CONFIG;
  validatorsPatternFormConfig = VALIDATORS_PATTERN_FORM_CONFIG_WITHOUT_VALUE
  loading: boolean;
  validatorsPatternModal = {
    title: 'Validators Pattern',
    visible: false,
    isSubmitted: false,
    isValid: false,
    data: {
      type: null,
      value: null,
      errorMessage: null,
    },
  };
  modalType: ModalTypes;
  editedValidatorType: string;

  _value: any[] = [];

  get value() {
    return this._value;
  }

  set value(value: any[]) {
    this._value = value || [];
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: any[]) {
    this.blur.emit(value);
  }

  writeValue(val: any[]) {
    this._value = val || [];
  }

  constructor() { }


  onColumnActionClick(actionResponse) {
    if (actionResponse.action.name === ActionMode.Edit) {
      this.onValidatorsPatternFieldValueChange({ "type": actionResponse.data.type });
      this.modalType = ModalTypes.Edit;
      this.validatorsPatternModal.visible = true;
      this.validatorsPatternModal.data = actionResponse.data;
      this.editedValidatorType = actionResponse.data.type
    }
    if (actionResponse.action.name === ActionMode.Delete) {
      this.value = this.value.filter(val => val.type !== actionResponse.data.type);
    }
  }

  openCreateValidatorsPatternModal() {
    this.onValidatorsPatternFieldValueChange({ "type": "Validators.required" });
    this.modalType = ModalTypes.Create;
    this.validatorsPatternModal.data = { type: null, value: null, errorMessage: null };
    this.validatorsPatternModal.visible = true;
  }

  onValidatorsPatternModalSubmit() {
    this.validatorsPatternModal.isSubmitted = true;
    if (this.validatorsPatternModal.isValid) {
      this.validatorsPatternModal.visible = false;
      if (this.modalType === ModalTypes.Create) {
        this.value = [...this.value, this.validatorsPatternModal.data];
      }
      if (this.modalType === ModalTypes.Edit) {
        this.value = this.value.map(item => item.type === this.editedValidatorType ? this.validatorsPatternModal.data : item);
      }
    }
  }

  closeValidatorsPatternModal() {
    this.validatorsPatternModal.isSubmitted = false;
    this.validatorsPatternModal.visible = false;
  }

  onValidatorsPatternDataValidityChange(isValid) {
    this.validatorsPatternModal.isValid = isValid;
  }

  onValidatorsPatternModalDataChange(formData) {
    this.validatorsPatternModal.data = formData;
  }

  onValidatorsPatternFieldValueChange(fieldValue) {
    if (fieldValue?.type && this.validatorsPatternModal.data.type !== fieldValue?.type) {
      if (
        fieldValue.type === 'Validators.required' ||
        fieldValue.type === 'Validators.requiredTrue' ||
        fieldValue.type === 'Validators.nullValidator' ||
        fieldValue.type === 'Validators.email'
      ) {
        this.validatorsPatternFormConfig = { ...VALIDATORS_PATTERN_FORM_CONFIG_WITHOUT_VALUE };
      } else {
        this.validatorsPatternFormConfig = { ...VALIDATORS_PATTERN_FORM_CONFIG_WITH_VALUE };
      }
    }

  }

}
