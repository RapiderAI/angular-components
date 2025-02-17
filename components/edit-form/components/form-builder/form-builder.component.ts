import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { buttonTypeSelectOptions } from '../../../../utils/shared/button/button-type-select-options';
import { ButtonType } from '../../../../utils/button/button-type.enum';
import { CrudFormConfigInputChangeReaction } from '../../../../utils/edit-form/crud-form-config-input-change-reaction.enum';
import { CrudFormConfig } from '../../../../utils/edit-form/crud-form-config.interface';
import { FormLayout } from '../../../../utils/edit-form/form-layout.enum';
import { SINGLE_NOT_SEARCHABLE_SELECT_SETTINGS } from '../../../../utils/select/single-not-searchable-select.settings';
import { defaultCrudViewFormConfig } from './defaults/default-form-config';
import { sizeSelectOptions } from './defaults/size-select-options';

@Component({
  selector: 'rappider-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => FormBuilderComponent),
      multi: true
    }
  ]
})
export class FormBuilderComponent implements ControlValueAccessor {

  @Output() blur = new EventEmitter<CrudFormConfig>();

  formConfig: CrudFormConfig = defaultCrudViewFormConfig;

  tempValue: CrudFormConfig;
  _value: CrudFormConfig;
  isEditModalVisible = false;
  /* holds the initial value passed to component. */
  tempValueWithoutChanges: CrudFormConfig;

  modalBodyStyle = {
    height: 95
  };

  /* settings for select component */
  SINGLE_SELECT_SETTINGS = SINGLE_NOT_SEARCHABLE_SELECT_SETTINGS;

  formLayoutOptions = Object.entries(FormLayout).map(([key, value]) => ({
    key: key,
    value: value
  }));

  inputChangeReactions = Object.entries(CrudFormConfigInputChangeReaction).map(([key, value]) => ({
    key: key,
    value: value
  }));

  buttonSizeSelectOptions = sizeSelectOptions;
  buttonTypeSelectOptions = buttonTypeSelectOptions;

  get value() {
    return this._value;
  }

  set value(value: CrudFormConfig) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.blur.emit(this.value);
  }

  constructor() { }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: CrudFormConfig) {
    if (value) {
      this.tempValue = value;
      if (!this.tempValue.submitButton) {
        this.tempValue.submitButton = {
          visible: true,
          type: ButtonType.Default
        };
      }
    } else {
      this.tempValue = cloneDeep(this.formConfig);
    }
    this.tempValueWithoutChanges = this.tempValue;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onItemsChange() {
    this.tempValue = { ...this.tempValue };
  }

  onFormConfigSave() {
    this.value = this.tempValue;
    this.isEditModalVisible = false;
  }

  onCancel() {
    this.isEditModalVisible = false;
    this.tempValue = cloneDeep(this.tempValueWithoutChanges);
  }

  openEditModal() {
    this.isEditModalVisible = true;
  }

}
