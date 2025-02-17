import { radioGroupDirectionOptions } from '@rapider/angular-components/core/radio-group';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { sizeSelectOptions } from '@rapider/angular-components/edit-form/components/form-builder/defaults/size-select-options';
import { InputSize } from '@rapider/angular-components/core/style';
import { SelectableOption } from '@rapider/angular-components/core/form-utils';
import { SelectMode, SelectModeOptions } from '@rapider/angular-components/core/select';
import { CrudFormItem,CrudFormSelectItem,CrudViewFormItemType } from '@rapider/angular-components/core/edit-form';
import { columnOptions, itemOptions, rowOptions } from '@rapider/angular-components/core/checkbox-table';
import { checkboxListDirectionOptions } from '@rapider/angular-components/core/checkbox-list';
import { checkboxTypeOptions } from '@rapider/angular-components/core/checkbox';
import { buttonTypeOptions } from '@rapider/angular-components/core/button';
import { textboxTypeOptions } from '@rapider/angular-components/core/textbox';
import { DateFormat } from '@rapider/angular-components/core/common';

export type CrudFormCombinedItem = CrudFormItem | CrudFormSelectItem;

@Component({
  selector: 'rappider-form-builder-input',
  templateUrl: './form-builder-input.component.html',
  styleUrls: ['./form-builder-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => FormBuilderInputComponent),
      multi: true
    }
  ]
})
export class FormBuilderInputComponent implements ControlValueAccessor {

  _value: any[];
  typeSelectOptions: SelectableOption[] = Object.entries(CrudViewFormItemType).map(([key, value]) => ({ key: key, value: value }));
  initialCrudFormItem: any = {
    type: undefined,
    title: undefined,
    fieldName: undefined,
    columnWidth: 100
  };
  formValidators;
  rowFormColumnsConfig = [
    {
      fieldName: 'key',
      config: {
        placeholder: 'Key',
      },
      typeAndFormat: {
        type: 'string'
      }
    },
    {
      fieldName: 'value',
      config: {
        placeholder: 'Value',
      },
      typeAndFormat: {
        type: 'string'
      }
    }
  ];

  checkboxTableCheckConfig = [
    {
      fieldName: 'row',
      config: {
        placeholder: 'Row',
      },
      typeAndFormat: {
        type: 'string'
      }
    },
    {
      fieldName: 'column',
      config: {
        placeholder: 'Column',
      },
      typeAndFormat: {
        type: 'string'
      }
    },
    {
      fieldName: 'title',
      config: {
        placeholder: 'Title',
      },
      typeAndFormat: {
        type: 'string'
      }
    },
    {
      fieldName: 'check',
      typeAndFormat: {
        type: 'boolean'
      }
    }
  ];

  editedIndex: number | undefined;
  isFirstInitialize = true;
  tempCrudFormItem: any = cloneDeep(this.initialCrudFormItem);

  imageUploadWidth: string;
  imageUploadHeight: string;
  imageUploadButtonText: string;
  imageUploadButtonType: string;
  imageUploadButtonIcon: string;
  imageUploadButtonTypeOptions = [
    {
      key: 'Default',
      value: 'default'
    },
    {
      key: 'Primary',
      value: 'primary'
    },
    {
      key: 'Dashed',
      value: 'dashed'
    },
    {
      key: 'Link',
      value: 'link'
    }
  ]

  editButtonIconConfig = {
    type: 'FONT_AWESOME',
    name: 'fa-light fa-pen-to-square'
  };

  deleteButtonIconConfig = {
    type: 'FONT_AWESOME',
    name: 'fa-sharp fa-solid fa-trash'
  };

  initialSelectFormItem: any = {
    size: InputSize.Default,
    settings: {
      searchable: true,
      mode: SelectMode.Single,
      allowClear: true,
      maxTagCount: undefined
    },
    options: [],
    invalidConfigText: undefined,
    disabled: false,
    type: CrudViewFormItemType.Select
  };

  initialMonacoEditorFormItem: any = {
    sizeSettings: { minHeight: '300px' },
    borderSettings: { border: 'none' },
    options: {
      theme: 'vs-default',
      language: 'typescript',
      minimap: { autohide: true, enabled: false },
      lineNumbers: { renderType: 0 }
    },
    type: CrudViewFormItemType.MonacoCodeEditor
  };

  /* Element Options for Select */
  inputSize = sizeSelectOptions;
  checkboxTypeOptions = checkboxTypeOptions;
  buttonTypeOptions = buttonTypeOptions;
  textboxTypeOptions = textboxTypeOptions;

  rowTitlePlacement = rowOptions;
  columnTitlePlacement = columnOptions;
  itemPlacement = itemOptions;
  selectMode = SelectModeOptions;
  checkboxListDirectionOptions = checkboxListDirectionOptions;
  dateFormatOptions = Object.entries(DateFormat).map(([key, value]) => ({
    key: key,
    value: value
  }));
  radioGroupDirectionOptions = radioGroupDirectionOptions;

  CrudViewFormItemType = CrudViewFormItemType;

  /* every field name must be unique.We're holding this variable to check if there are any overlapped field name. */
  hasFieldNameError = false;
  /* form submittion state */
  tempValueSubmitted = false;
  /* has error while adding new item */
  hasAddError = false;
  /* if the item is new, its true else ( edits ) it's false */
  isAddingControl = false;
  lastInput: any[] | null = null;
  lastOutput: any[] | null = null;

  get value() {
    return this._value;
  }

  set value(value: any[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any[]) {
    if (!value) {
      this._value = [cloneDeep(this.initialCrudFormItem)];
      this.editedIndex = 0;
      this.isFirstInitialize = true;
    } else {
      this._value = value;
      this.editedIndex = undefined;
      this.isFirstInitialize = false;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  addFormControl() {
    if (!this.editedIndex && this.editedIndex !== 0) {
      this.value = [...this.value, this.initialCrudFormItem];
      this.editedIndex = this.value.length - 1;
      this.hasAddError = false;
      this.isAddingControl = true;
    } else {
      this.hasAddError = true;
    }
  }

  onSave() {
    this.tempCrudFormItem.validators = this.manipulateValidators(this.formValidators)
    if (this.isItemValid()) {
      this.value = this.value.map((item, index) =>
        index === this.editedIndex ? { ...this.tempCrudFormItem, index: this.tempCrudFormItem.index } : item
      );
      this.clearTempValue();
      this.isFirstInitialize = false;
      this.hasFieldNameError = false;
      this.tempValueSubmitted = false;
      this.isAddingControl = false;
      this.onChange(this.value);


    } else {
      if (!this.isFieldNameUnique()) {
        this.hasFieldNameError = true;
      }
      this.tempValueSubmitted = true;
    }
  }

  onImageUploadWidthChange(value) {
    this.tempCrudFormItem = {
      ...this.tempCrudFormItem,
      uploadedImage: {
        width: value,
        height: this.tempCrudFormItem.uploadedImage.height,
        fallback: false
      }
    }
  }

  onImageUploadHeightChange(value) {
    this.tempCrudFormItem = {
      ...this.tempCrudFormItem,
      uploadedImage: {
        height: value,
        width: this.tempCrudFormItem.uploadedImage.width,
        fallback: false
      }
    }
  }

  onImageUploadButtonTextChange(value) {
    this.tempCrudFormItem = {
      ...this.tempCrudFormItem,
      uploadButton: {
        text: value,
        type: this.tempCrudFormItem.uploadButton.type,
        icon: this.tempCrudFormItem.uploadButton.icon
      }
    }
  }

  onImageUploadButtonTypeChange(value) {
    this.tempCrudFormItem = {
      ...this.tempCrudFormItem,
      uploadButton: {
        type: value,
        text: this.tempCrudFormItem.uploadButton.text,
        icon: this.tempCrudFormItem.uploadButton.icon
      }
    }
  }

  onImageUploadButtonIconChange(value) {
    this.tempCrudFormItem = {
      ...this.tempCrudFormItem,
      uploadButton: {
        icon: value,
        type: this.tempCrudFormItem.uploadButton.type,
        text: this.tempCrudFormItem.uploadButton.text
      }
    }
  }

  onEditItemClick(index: number) {
    if (this.isAddingControl) {
      this.value = this.value.filter((item, index) => index !== this.value.length - 1);
    }
    this.tempCrudFormItem = cloneDeep(this.value[index]);
    this.checkItemType();
    this.editedIndex = index;
  }

  checkItemType() {
    if (this.tempCrudFormItem.type === 'image-upload') {
      this.imageUploadHeight = this.tempCrudFormItem?.uploadedImage?.height || null;
      this.imageUploadWidth = this.tempCrudFormItem?.uploadedImage?.width || null;
      this.imageUploadButtonText = this.tempCrudFormItem?.uploadButton?.text || null;
      this.imageUploadButtonType = this.tempCrudFormItem?.uploadButton?.type || null
      this.imageUploadButtonIcon = this.tempCrudFormItem?.uploadButton?.icon || null
    }
  }

  onEditCancel() {
    if (this.isAddingControl) {
      this.value = this.value.filter((item, index) => index !== this.editedIndex);
      this.isAddingControl = false;
    }
    this.clearTempValue();
  }

  clearTempValue() {
    this.tempCrudFormItem = cloneDeep(this.initialCrudFormItem);
    this.editedIndex = undefined;
  }

  onTypeChange(type: CrudViewFormItemType) {
    if (type === CrudViewFormItemType.Select) {
      this.tempCrudFormItem = {
        ...this.tempCrudFormItem,
        ...cloneDeep(this.initialSelectFormItem)
      };
    } else if (type === CrudViewFormItemType.MonacoCodeEditor) {
      this.tempCrudFormItem = {
        ...this.tempCrudFormItem,
        ...cloneDeep(this.initialMonacoEditorFormItem)
      };
    } else {
      this.tempCrudFormItem.type = type;
      this.deleteAdditionalFields();
    }
  }

  deleteAdditionalFields() {
    delete this.tempCrudFormItem.size;
    delete this.tempCrudFormItem.settings;
    delete this.tempCrudFormItem.options;
    delete this.tempCrudFormItem.disable;
    delete this.tempCrudFormItem.invalidConfigText;
  }

  onDeleteItemClick(deletedItemIndex: number) {
    this.value = this.value.filter((item, index) => index !== deletedItemIndex);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.value, event.previousIndex, event.currentIndex);
    this.value = this.value.map((item, index) => ({ ...item, index: index }));
    this.onChange(this.value);
  }

  isItemValid() {
    this.tempCrudFormItem.title = this.tempCrudFormItem.title || null;
    return this.tempCrudFormItem.fieldName && this.tempCrudFormItem.type && this.isFieldNameUnique();
  }

  isFieldNameUnique() {
    const hasOverlappedFieldName = this.value.some((item, index) => item.fieldName === this.tempCrudFormItem.fieldName && index !== this.editedIndex);
    return !hasOverlappedFieldName;
  }

  manipulateValidators(validators: any): any {
    return validators?.map(item => {
      const regex = /Validators\.(\w+)(?:\((.*?)\))?/;
      const match = item.type.match(regex);

      let errorKey = match ? match[1] : item.type;
      let typeWithValue = item.type;

      if (!match[2] && item.value !== null && item.value !== undefined) {
        typeWithValue = `Validators.${errorKey}(${item.value})`;
      } else if (match && match[2]) {
        typeWithValue = `Validators.${errorKey}(${match[2]})`;
      }

      return {
        type: typeWithValue,
        errorKey: errorKey,
        errorMessage: item.errorMessage
      };
    });
  }

  onValidatorsChange(newValidators) {
    this.formValidators = newValidators
  }

  getTransformValidators(validators: any[]): any[] {
    if (this.lastInput === validators) {
      return this.lastOutput!;
    }

    this.lastInput = validators;
    this.lastOutput = validators?.map((validator) => {
      const typeMatch = validator.type.match(/(Validators\.\w+)\((.+)\)/);

      if (typeMatch) {
        const typeName = typeMatch[1];
        const value = typeMatch[2];

        return {
          type: `${typeName}()`,
          errorMessage: validator.errorMessage,
          value: parseFloat(value),
        };
      }

      return {
        type: validator.type,
        errorMessage: validator.errorMessage,
      };
    });
    this.formValidators = this.lastOutput

    return this.lastOutput;
  }


}
