import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { DYNAMIC_EDIT_FORM_CONFIG } from './configs/dynamic-edit-form.config';
import { RappiderDataOrderService } from 'libs/components/src/lib/services';
import { ButtonComponentConfig } from 'libs/components/src/lib/utils/button';
import { JSON_ARRAY_LIST_GRID_CONFIG } from 'libs/components/src/lib/utils/json-array';
import { CrudViewColumnType, OrderChangeOutput } from 'libs/components/src/lib/utils/list-grid';
import { CrudFormItem } from 'libs/components/src/lib/utils/edit-form';
import { IconType } from 'libs/components/src/lib/utils/icon';
import { StringUtilityService } from 'libs/shared/src/lib/services/string-utility-service/string-utility.service';


@Component({
  selector: 'rappider-dynamic-array-form',
  templateUrl: './dynamic-array-form.component.html',
  styleUrls: ['./dynamic-array-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderDynamicArrayFormComponent),
      multi: true
    }
  ]
})
export class RappiderDynamicArrayFormComponent implements OnChanges {

  /**
   * input definition of related field
   * for example:
   * panels: Panel[] (Accordion Component)
   *
   * @type {*}
   * @memberof RappiderDynamicArrayFormComponent
   */
  @Input() dynamicFormInputs: any;

  /**
   * default inputs of activeContentTreeItem
   *
   * @type {*}
   * @memberof RappiderDynamicArrayFormComponent
   */
  @Input() defaultInputs: any;

  @Output() blur = new EventEmitter<any>();

  /* add new item button config */
  addNewItemButton: ButtonComponentConfig = {
    text: 'Add New Item',
    icon: {
      type: IconType.FontAwesome,
      name: 'fa-solid fa-plus'
    }
  };

  /* to show field names in list grid */
  previewFieldNames: string[];

  /* dynamic edit form config */
  DYNAMIC_EDIT_FORM_CONFIG = cloneDeep(DYNAMIC_EDIT_FORM_CONFIG);

  /* list grid config */
  FORM_ARRAY_LIST_GRID_CONFIG = cloneDeep(JSON_ARRAY_LIST_GRID_CONFIG);

  /* modal visibility */
  isModalVisible: boolean;

  modalStack: Array<any> = [];
  formData: any;
  isEditMode: boolean;
  editIndex: number;

  _value: any;

  get value() {
    return this._value ?? [];
  }

  set value(value: any) {
    this._value = value ?? [];
    this.onChange(value);
    this.onTouched();
    this.blur.emit(this.value);
  }

  constructor(
    private dataOrderService: RappiderDataOrderService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dynamicFormInputs) {
      this.setPreviewFieldNames();
    }
    if (changes.defaultInputs) {
      this.setValue();
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any[]): void {
    if (value?.length > 0) {
      this._value = value;
    } else {
      this._value = [];
    }
    this.FORM_ARRAY_LIST_GRID_CONFIG = { ...this.FORM_ARRAY_LIST_GRID_CONFIG };
    this.setListGridConfig();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setPreviewFieldNames() {
    this.previewFieldNames = this.dynamicFormInputs?.type?.fields?.map(field => field.name);
    this.setListGridConfig();
  }

  itemActionClick(event: any) {
    if (event.action.name === 'DELETE') {
      const rowIndex = event.rowIndex;
      this.value.splice(rowIndex, 1);
      this.value = [...this.value];
    } else if (event?.action?.name === 'EDIT') {
      this.setUpdatedFormConfigAndData(event.rowIndex);
    }
  }

  setUpdatedFormConfigAndData(rowIndex: number) {
    const itemToUpdate = this.value[rowIndex];

    this.isEditMode = true;
    this.editIndex = rowIndex;

    const updateModal = {
      title: 'Update Item',
      fieldName: this.dynamicFormInputs.fieldName,
      config: {
        items: this.createFormConfig(this.dynamicFormInputs.type.fields),
        submitButton: { visible: false }
      },
      data: itemToUpdate,
      isModalVisible: true
    };

    this.formData = { ...itemToUpdate };

    this.modalStack.push(updateModal);
  }

  onOrderChange(output: OrderChangeOutput) {
    const orderedValue = this.dataOrderService.changeOrderByStartAndEndIndex(
      this.value,
      output.data,
      output.orderStartIndex,
      output.orderEndIndex
    );
    this.value = orderedValue;
  }

  setValue() {
    const fieldName = this.dynamicFormInputs?.fieldName;
    if (fieldName) {
      this.value = { [fieldName]: this.defaultInputs[fieldName] };
    } else {
      this.value = null;
    }
  }

  setListGridConfig() {
    let columns = [];
    if (this.previewFieldNames?.length) {
      columns = this.previewFieldNames.map(fieldName => ({
        title: fieldName,
        fieldName: fieldName,
        type: CrudViewColumnType.Text
      }));
      this.FORM_ARRAY_LIST_GRID_CONFIG.columns = columns;
    }
  }

  addNewJson() {
    const newModal = {
      title: 'Add New Item',
      fieldName: this.dynamicFormInputs.fieldName, // which object field
      config: {
        items: this.createFormConfig(this.dynamicFormInputs.type.fields),
        submitButton: { visible: false }
      },
      data: {},
      isModalVisible: true
    };
    this.formData = {};

    this.modalStack.push(newModal);
  }

  createFormConfig(fields: any[]): CrudFormItem[] {
    return fields.map(field => ({
      title: field?.title || StringUtilityService.toTitleCase(field.name),
      fieldName: field.name,
      type: field.uiDataSelector !== 'component' ? field.uiDataSelector : 'object-button',
      text: field.uiDataSelector === 'component' ? `Edit ${StringUtilityService.toTitleCase(field.name)}` : null,
      key: field.uiDataSelector === 'component' ? field.name : null,
      options: this.setRadioButtonOptions(field?.type?.enumData),
      childFields: field?.type?.fields?.length > 0 ? field?.type?.fields : null
    }));
  }

  closeJsonArrayModal(modalIndex: number) {
    this.modalStack[modalIndex].isModalVisible = false;
    this.modalStack.splice(modalIndex, 1);
  }

  setRadioButtonOptions(enumData: any) {
    return enumData?.data || null;
  }

  onFormValueChange(event: any, modalIndex: number) {
    const currentModal = this.modalStack[modalIndex];

    for (const key in event) {
      if (event[key] !== null) {
        currentModal.data[key] = event[key];
      }
    }

  }

  onValueChange(modalIndex: number) {
    const currentModal = this.modalStack[modalIndex];

    if (modalIndex > 0) {
      const parentModal = this.modalStack[modalIndex - 1];
      const fieldName = currentModal.fieldName;

      parentModal.data[fieldName] = currentModal.data;
    } else {
      if (this.isEditMode && this.editIndex !== null) {
        this.value[this.editIndex] = { ...currentModal.data };
        this.value = [...this.value];

        this.isEditMode = false;
        this.editIndex = null;
      } else {
        this.value.push({ ...currentModal.data });
        this.value = [...this.value];
      }
    }

    this.closeJsonArrayModal(modalIndex);
  }

  onObjectFieldModalOpen(event: any, modalIndex: number) {
    const { fieldName } = event;
    const fields = event.childFields;

    if (fields) {
      const currentModalData = this.modalStack[modalIndex].data[fieldName];

      const newModal = {
        title: `Edit ${StringUtilityService.toTitleCase(fieldName)}`,
        fieldName: fieldName,
        config: {
          items: this.createFormConfig(fields),
          submitButton: { visible: false }
        },
        data: currentModalData || {},
        isModalVisible: true
      };
      this.formData = currentModalData || {};

      this.modalStack.push(newModal);
    }
  }

}
