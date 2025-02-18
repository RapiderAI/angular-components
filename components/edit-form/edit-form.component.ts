import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { set, orderBy, groupBy, cloneDeep } from 'lodash';
import { CrudFormItemMenuItem } from '@rapider/angular-components/core/edit-form';
import { ComponentSize } from '@rapider/angular-components/core/utils';
import { CrudFormObjectItem } from '@rapider/angular-components/core/edit-form';
import { CrudFormConfig } from '@rapider/angular-components/core/edit-form';
import { ActionResponse } from '@rapider/angular-components/core/utils';
import { BreadcrumbOption } from '@rapider/angular-components/core/breadcrumb';
import { FormLayout } from '@rapider/angular-components/core/edit-form';
import { CrudViewFormItemType } from '@rapider/angular-components/core/edit-form';
import { ActionBehavior } from '@rapider/angular-components/core/utils';
import { ActionView } from '@rapider/angular-components/core/utils';
import { FormService } from '@rapider/angular-components/core/services';
import { CrudFormConfigInputChangeReaction } from '@rapider/angular-components/core/edit-form';
import { CrudFormItem } from '@rapider/angular-components/core/edit-form';
import { MustMatch } from '@rapider/angular-components/core/validators';
import { CrudFormButtonItem } from '@rapider/angular-components/core/edit-form';
import { CrudFormValueEmitMode } from '@rapider/angular-components/core/edit-form';
import { CrudFormLabelFunctionItem } from '@rapider/angular-components/core/edit-form';
import { DynamicDataForSelectBox } from '@rapider/angular-components/core/edit-form';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { IconType } from '@rapider/angular-components/core/icon';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { CrudFormItemOutputEvent } from '@rapider/angular-components/core/edit-form';
import { animate, style, transition, trigger } from '@angular/animations';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CardSelectorComponent } from '@rapider/angular-components/card-selector';
import { RappiderModalComponent } from '@rapider/angular-components/modal';
import { RappiderBreadcrumbComponent } from '@rapider/angular-components/breadcrumb';
import { RappiderListGridDataInputComponent } from '@rapider/angular-components/list-grid-data-input';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderEditFormConfigInputComponent } from '@rapider/angular-components/edit-form-config-input';
import { RappiderJsonArrayComponent } from '@rapider/angular-components/json-array';
import { RappiderListComponent } from '@rapider/angular-components/list';
import { RappiderDimensionSelectComponent } from '@rapider/angular-components/dimension-select';
import { RappiderListGridConfigInputComponent } from '@rapider/angular-components/list-grid-config-input';
import { RappiderTimePickerComponent } from '@rapider/angular-components/time-picker';
import { RappiderColorPickerComponent } from '@rapider/angular-components/color-picker';
import { RappiderTextareaComponent } from '@rapider/angular-components/textarea';
import { RappiderRichTextEditorComponent } from '@rapider/angular-components/rich-text-editor';
import { RappiderCodeEditorComponent } from '@rapider/angular-components/code-editor-wrapper';
import { RappiderHtmlEditorComponent } from '@rapider/angular-components/html-editor';
import { RappiderNumberInputComponent } from '@rapider/angular-components/number-input';
import { RappiderDatePickerComponent } from '@rapider/angular-components/date-picker';
import { RappiderRadioComponent } from '@rapider/angular-components/radio';
import { RappiderCheckboxComponent } from '@rapider/angular-components/checkbox';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderTagInputComponent } from '@rapider/angular-components/tag-input';
import { RappiderRateComponent } from '@rapider/angular-components/rate';
import { RappiderSliderComponent } from '@rapider/angular-components/slider';
import { RappiderRowFormComponent } from '@rapider/angular-components/row-form';
import { RappiderStringArrayComponent } from '@rapider/angular-components/string-array';
import { RappiderInputValidatorInfoComponent } from '@rapider/angular-components/input-validator-info';
import { RappiderInputErrorComponent } from '@rapider/angular-components/input-error';
import { RappiderInputLabelComponent } from '@rapider/angular-components/input-label';
import { RappiderRadioGroupComponent } from '@rapider/angular-components/radio-group';
import { RappiderInputTemplateComponent } from '@rapider/angular-components/input-template';
import { RappiderSwitchComponent } from '@rapider/angular-components/switch';
import { RappiderSpinComponent } from '@rapider/angular-components/spin';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderRowSelectComponent } from '@rapider/angular-components/row-select';
import { RappiderInlineRowFormModule } from '@rapider/angular-components/inline-row-form';
import { RappiderIconPickerTwoComponent } from '@rapider/angular-components/icon-picker-two';
import { RappiderPhoneNumberInputComponent } from '@rapider/angular-components/phone-number-input';
import { RappiderAlertComponent } from '@rapider/angular-components/alert';
import { RappiderImageUploadComponent } from '@rapider/angular-components/image-upload';
import { RappiderCheckboxTableComponent } from '@rapider/angular-components/checkbox-table';
import { RappiderDocumentUploadComponent } from '@rapider/angular-components/document-upload';
import { RappiderPreviewerComponent } from '@rapider/angular-components/previewer';
import { RappiderJsonInputComponent } from '@rapider/angular-components/json-input';
import { RappiderInputGroupComponent } from '@rapider/angular-components/input-group';
import { RappiderIconPickerWrapperComponent } from '@rapider/angular-components/icon-picker-wrapper';
import { RappiderListGridComponent } from '@rapider/angular-components/list-grid';
import { RappiderCheckboxListComponent } from '@rapider/angular-components/checkbox-list';
import { RappiderTreeSelectComponent } from '@rapider/angular-components/tree-select';
import { RappiderAssetPickerComponent } from '@rapider/angular-components/asset-picker';
import { CodeEditorComponent } from '@rapider/angular-components/code-editor';
import { RappiderDynamicArrayFormComponent } from './components/dynamic-array-form/dynamic-array-form.component';

const monacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {
  }
};


@Component({
  selector: 'rappider-crud-view-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzToolTipModule,
    NzDropDownModule,
    NzIconModule,
    DragDropModule,
    NzTabsModule,
    NzTagModule,
    CardSelectorComponent,
    RappiderModalComponent,
    RappiderBreadcrumbComponent,
    RappiderListGridDataInputComponent,
    RappiderTextboxComponent,
    RappiderEditFormConfigInputComponent,
    RappiderJsonArrayComponent,
    RappiderListComponent,
    RappiderDimensionSelectComponent,
    RappiderListGridConfigInputComponent,
    RappiderTimePickerComponent,
    RappiderColorPickerComponent,
    RappiderTextareaComponent,
    RappiderRichTextEditorComponent,
    RappiderCodeEditorComponent,
    CodeEditorComponent,
    RappiderHtmlEditorComponent,
    RappiderNumberInputComponent,
    RappiderDatePickerComponent,
    RappiderRadioComponent,
    RappiderCheckboxComponent,
    RappiderSelectComponent,
    RappiderTagInputComponent,
    RappiderRateComponent,
    RappiderSliderComponent,
    RappiderRowFormComponent,
    RappiderStringArrayComponent,
    RappiderInputValidatorInfoComponent,
    RappiderInputErrorComponent,
    RappiderInputLabelComponent,
    RappiderRadioGroupComponent,
    RappiderRadioGroupComponent,
    RappiderInputTemplateComponent,
    RappiderSwitchComponent,
    RappiderSpinComponent,
    RappiderButtonComponent,
    RappiderIconComponent,
    RappiderRowSelectComponent,
    RappiderDynamicArrayFormComponent,
    RappiderInlineRowFormModule,
    RappiderIconPickerTwoComponent,
    RappiderPhoneNumberInputComponent,
    RappiderAlertComponent,
    RappiderCheckboxListComponent,
    RappiderAssetPickerComponent,
    RappiderTreeSelectComponent,
    RappiderCheckboxTableComponent,
    RappiderDocumentUploadComponent,
    RappiderPreviewerComponent,
    RappiderJsonInputComponent,
    RappiderInputGroupComponent,
    RappiderIconPickerWrapperComponent,
    RappiderListGridComponent,
    RappiderImageUploadComponent,
  ],
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateY(100%)', opacity: 0, position: 'absolute' }),
            animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: 'translateY(0)', opacity: 1 }),
            animate('200ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RappiderEditFormComponent implements OnInit, OnChanges {

  /* configuration of this component */
  @Input() config: CrudFormConfig;
  /* data for default input values */
  @Input() data: any;
  /* auto submit&dirty value for form */
  @Input() submitted: boolean;
  /* loading status for submit button */
  @Input() submitButtonLoading: boolean;
  /* dynamic data for select box */
  @Input() dynamicDataForSelectBox: DynamicDataForSelectBox[];
  /* number of menu items, Dropdown if greater than 2, otherwise button */
  @Input() itemLength = 2; // default number is 2
  @Input() slideMode = false;
  @Input() stepTagVisible = false;
  @Input() dividerMode = false;
  @Input() showErrors: boolean;
  @Input() focusFirstInput = true;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() submitButtonClick = new EventEmitter<any>();
  @Output() cancelButtonClick = new EventEmitter<boolean>();
  @Output() formValueChange = new EventEmitter<any>();
  @Output() fieldValueChange = new EventEmitter<any>();
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() buttonClick = new EventEmitter<ActionResponse>();
  @Output() labelMenuItemClick = new EventEmitter<CrudFormItemMenuItem>();
  @Output() fieldLinkStateChange = new EventEmitter<CrudFormItem>();
  /* You can use this output to route component events. ex: (close)="onItemOutputEvent('close', $event)" */
  @Output() itemOutputEvent = new EventEmitter<CrudFormItemOutputEvent>();
  /* use select button output */
  @Output() selectButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() objectModalOpen = new EventEmitter<any>();
  @Output() iconClick = new EventEmitter();

  /* form variables */
  dataForm: FormGroup;
  dataFormFieldErrors: { [key: string]: string[] } = {};
  isDataFormFieldErrorsChecked = false;
  disableEmitFieldChange = false;

  loading = true;

  objectFieldEditModal: {
    visible: boolean;
    breadcrumbOptions: BreadcrumbOption[];
    activeBreadcrumbOption: BreadcrumbOption;
  } = {
      visible: false,
      breadcrumbOptions: [],
      activeBreadcrumbOption: null
    };

  /* DEFAULT DEFINITIONS */
  FULL_COMPONENT_SIZE: ComponentSize = { xs: 24 };
  DEFAULT_LABEL_COMPONENT_SIZE: ComponentSize = { xs: 24, sm: 24, md: 6, lg: 5, xxl: 5 };
  DEFAULT_INPUT_COMPONENT_SIZE: ComponentSize = { xs: 24, sm: 24, md: 18, lg: 19, xxl: 19 };
  DEFAULT_SUBMIT_BUTTON_TEXT = 'Save';
  DEFAULT_FORM_LAYOUT = FormLayout.Horizontal;

  FormLayout = FormLayout;
  ComponentTypes = CrudViewFormItemType;
  ActionBehavior = ActionBehavior;
  ActionView = ActionView;

  /* Form items groupped by sections */
  grouppedItems;
  /* names of the sections */
  itemSections: string[];
  rowNumbers: number[];
  uniqueRowNumbers: number[];

  /**
   * sets true after 500ms
   * used to render the codemirror component properly as codemirror gutter doesn't initialized as it should be.
   *
   * @memberof RappiderEditFormComponent
   */
  timeoutCompleted = false;
  lockIcon: IconComponentConfig = {
    name: 'fa-regular fa-lock-keyhole',
    type: IconType.FontAwesome
  };
  unlockIcon: IconComponentConfig = {
    name: 'fa-regular fa-lock-keyhole-open',
    type: IconType.FontAwesome
  };

  activeSlide = 0;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (
      this.slideMode
      && event.key === 'Enter'
      && !event.metaKey
      && !event.altKey
      && !event.shiftKey
      && !event.ctrlKey
    ) {
      this.handleMoveNextSlideWithEnter();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    this.config = cloneDeep(this.config);
    this.generateForm();
    this.initTimeout();
    if (this.showErrors) {
      this.showFormErrorsInitially();
    }
  }

  ngAfterViewInit(): void {
    if (this.focusFirstInput) {
      this.applyAutofocusToFirstInput();
    }
  }

  applyAutofocusToFirstInput() {
    const formInputs = this.elRef.nativeElement.querySelectorAll('input');
    if (formInputs.length > 0) {
      const firstInput = formInputs[0];
      firstInput.focus();

      const value = firstInput.value;
      if (value) {
        firstInput.setSelectionRange(value.length, value.length);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']?.currentValue) {
      this.config = cloneDeep(this.config);
      this.transformValidators(this.config);
      /* generate form */
      this.generateForm();
      /* set input change reaction if not exist */
      if (!this.config.inputChangeReaction) {
        this.config.inputChangeReaction = CrudFormConfigInputChangeReaction.Default;
      }
      this.checkAllDataFormFieldErrors();
      this.emitValidity();
    }

    if (changes['data']?.currentValue && this.dataForm) {
      // we don't want to trigger value change action when passing data from the parent component,
      // so we use this flag to avoid value change action
      this.disableEmitFieldChange = true;
      this.dataForm.patchValue(this.data);
      this.config.items.forEach(formItem => {
        this.dataForm?.get(formItem.fieldName)?.updateValueAndValidity({ onlySelf: true });
        this.checkDataFormFieldErrorsByFormItem(formItem);
      });
      this.emitValidity();
      this.disableEmitFieldChange = false;
    }
    if (changes['submitted']?.currentValue) {
      this.checkAllDataFormFieldErrors();
      this.emitValidity();
    }
  }

  /*
   * This function is avoids unnecessary render in ngFor loop
   */
  formItemTrackBy(index, formItem) {
    return formItem.fieldName;
  }

  /**
   * This function helps to user to jump next slide when keydown only EnterKey without any key (like metaKey, altKey etc.)
   *
   */
  handleMoveNextSlideWithEnter() {
    const activeFormItem = this.visibleFormItems?.[this.activeSlide];
    if (activeFormItem) {
      if (this.activeSlide === this.visibleFormItems.length - 1) {
        this.onFormSubmit();
      } else {
        this.slideModeOkButtonClick();
      }
    }
  }

  initTimeout() {
    setTimeout(() => this.timeoutCompleted = true, 500);
  }

  showFormErrorsInitially() {
    this.checkAllDataFormFieldErrors();
  }

  generateForm() {
    this.loading = true;
    /* set field order by their indexes */
    if (this.config?.items) {
      this.config.items = orderBy(this.calculateRows(this.config.items.map(item => ({ ...item, columnWidth: item?.columnWidth || 100 }))), 'index', 'asc');
      if (this.config.items.some(item => item.section)) {
        this.grouppedItems = groupBy(this.config?.items, 'section');
        this.itemSections = Object.keys(this.grouppedItems).filter(grouppedItem => grouppedItem);
      }
    }

    /* set main form */
    this.dataForm = this.createFormGroupByCrudFormItems(this.config?.items, this.dataForm?.value);
    /* set dataForm validators, TODO: set validators for nested form groups too */
    if (this.config?.validators?.length && this.config?.items?.length) {
      this.dataForm.setValidators(this.generateFormGroupValidators());
    }
    this.loading = false;
  }

  /* Display section header if it has a section title and it is not undefined */
  displaySectionHeader(itemSection) {
    return itemSection && itemSection !== 'undefined';
  }

  /**
   * returns specified form field's value
   *
   * @param {string} fieldName
   * @returns
   * @memberof EditFormComponent
   */
  getFormFieldValueByFieldName(fieldName: string) {
    return this.dataForm.get(fieldName)?.value;
  }

  createFormGroupByCrudFormItems(crudFormItems: CrudFormItem[], data = null) {
    if (crudFormItems?.length) {
      const formData = {};
      crudFormItems.forEach(item => {
        if (!item['items']?.length) {
          // #region CREATE FORM FIELD
          if (item.fieldName) {
            /* get initial value */
            const value = (data && data[item.fieldName]) ?? item.default;
            /* get form field validators */
            const validators = item.validators?.filter(validator => validator.type).map(validator => validator.type) || [];
            /* set form field */
            formData[item.fieldName] = [value, validators];
          }
          // #endregion
        } else {
          // #region CREATE FORM GROUP
          /* get nested data */
          const nestedData = data && data[item.fieldName];
          /* get form group */
          formData[item.fieldName] = this.createFormGroupByCrudFormItems(item['items'], nestedData);
          // #endregion
        }
      });
      return this.formBuilder.group(formData);
    }
    
    // If no crudFormItems are passed or it's empty, return an empty form group or throw an error.
    return this.formBuilder.group({});  // Return an empty form group as a fallback
  }
  

  /* TODO: move validator functions to validator service */
  generateFormGroupValidators() {
    const validators = [];
    this.config.validators.forEach(validator => {
      switch (validator.validatorKey) {
        case 'mustMatch':
          if (validator.params && validator.params.field1 && validator.params.field2) {
            validators.push(MustMatch(validator.params.field1, validator.params.field2));
          }
          break;
        default:
          break;
      }
    });
    return validators;
  }

  resetForm() {
    this.dataForm.reset();
    this.clearAllDataFormFieldErrors();
  }

  getFieldErrorMessages(form: FormGroup, item: CrudFormItem) {
    let errors = [];
    const errorKeys = this.formService.getActiveErrorKeys(form, item.fieldName);
    if (errorKeys.length) {
      errors = item.validators
        .filter(validator => errorKeys.includes(validator.errorKey))
        .map(validator => validator.errorMessage);
    }
    return errors;
  }

  checkDataFormFieldErrorsByFormItem(item: CrudFormItem) {
    if (item.fieldName) {
      const errors = this.getFieldErrorMessages(this.dataForm, item);
      if (errors?.length) {
        this.dataFormFieldErrors[item.fieldName] = errors;
      } else {
        delete this.dataFormFieldErrors[item.fieldName];
      }
    }
  }

  checkAllDataFormFieldErrors() {
    if (!this.isDataFormFieldErrorsChecked) {
      this.formService.checkFormValidation(this.dataForm);
      this.config.items.forEach(item => this.checkDataFormFieldErrorsByFormItem(item));
    } else {
      this.isDataFormFieldErrorsChecked = true;
    }
  }

  clearAllDataFormFieldErrors() {
    this.dataFormFieldErrors = {};
    this.isDataFormFieldErrorsChecked = false;
  }

  onButtonItemClick(item: CrudFormButtonItem) {
    if (item.behavior === ActionBehavior.Route) {
      /* navigate */
      this.router.navigateByUrl(item.redirectUrl);
    } else if (item.behavior === ActionBehavior.Emit) {
      /* emit */
      const actionResponse: ActionResponse = {
        action: item
      };
      this.buttonClick.emit(actionResponse);
    }
  }

  onObjectItemButtonClick(item: any) {
    this.objectModalOpen.emit(item);
  }

  onLabelMenuItemClick(menuItem: CrudFormItemMenuItem) {
    this.labelMenuItemClick.emit(menuItem);
  }

  onSelectButtonClick(event: ButtonComponentConfig) {
    this.selectButtonClick.emit(event);
  }

  onFieldValueChange(item: CrudFormItem, value: any) {
    if (!this.disableEmitFieldChange) {
      this.findAndPatchLinkedFormItems(item);
      if (this.config.inputChangeReaction === CrudFormConfigInputChangeReaction.Default) {
        /* set error for changed field */
        this.checkDataFormFieldErrorsByFormItem(item);
        /* emit valid status of the form */
        this.emitValidity();
        /* get changed field body */
        const changedFieldBody = this.getChangedFieldValueBody(item.fieldName, value);
        /* emit */
        this.emitFieldValue(changedFieldBody);
      }
    }
  }

  get visibleFormItems() {
    return this.config.items.filter(item => item.visible !== false);
  }

  // #region LINKED FORM ITEMS

  /* It equates the values of the source item to the target item,
  if there is a data transformationfunction,
  it puts the values into the function and syncs them. */
  findAndPatchLinkedFormItems(sourceItemConfig: CrudFormItem) {
    this.config.items.forEach(item => {
      if (item.isLinked && item.linkedFieldName === sourceItemConfig.fieldName) {
        const targetItem = this.dataForm.get(item.fieldName);
        const sourceItem = this.dataForm.get(sourceItemConfig.fieldName);
        if (item.linkDataTransformationFunction) {
          targetItem.patchValue(item.linkDataTransformationFunction(sourceItem.value));
        } else {
          targetItem.patchValue(sourceItem.value);
        }
      }
    });
  }

  /* updates isLinked state when click button */
  onLinkChange(item: CrudFormItem) {
    item.isLinked = !item.isLinked;
    this.fieldLinkStateChange.emit(item);
  }

  findLinkedConfigItemByLinkedFieldName(item: CrudFormItem) {
    return this.config.items.find(itemConfig => itemConfig.fieldName === item.linkedFieldName);
  }

  isItemHasLinkedFormItem(item: CrudFormItem) {
    return this.config.items.some(itemConfig => itemConfig.linkedFieldName === item.fieldName);
  }

  unlockAllLinkedFields(parentitem: CrudFormItem) {
    this.config.items.forEach(item => {
      if (item.isLinked && item.linkedFieldName === parentitem.fieldName) {
        item.isLinked = false;
      }
    });
  }

  // #endregion LINKED FORM ITEMS

  onFieldBlur(fieldName: string) {
    if (this.config?.inputChangeReaction === CrudFormConfigInputChangeReaction.Blur) {
      /* get changed field body */
      const changedFieldBody = this.getChangedFieldValueBody(fieldName);
      /* emit the changed value */
      this.emitFieldValue(changedFieldBody);
    }
  }

  getChangedFieldValueBody(fieldName: string, value?: any) {
    /* get changed field as nested */
    const targetNestedFieldNames = this.getActiveFieldNamesFromActiveBreadcrumbOption(fieldName);
    /* get value from the form if not specified */
    if (!value) {
      /* get field value */
      value = this.dataForm.get(targetNestedFieldNames).value;
    }
    /* define patch data */
    const patchData = {};
    /* set patch data */
    set(patchData, targetNestedFieldNames, value);
    /* return patch data */
    return patchData;
  }

  onFormSubmit() {
    if (this.slideMode) {
      const item = this.visibleFormItems[this.activeSlide];
      if (!this.dataForm.controls[item.fieldName].valid) {
        this.dataForm.controls[item.fieldName].markAsTouched();
        this.dataForm.controls[item.fieldName].markAsDirty();
        this.checkDataFormFieldErrorsByFormItem(item);
        this.dataForm.controls[item.fieldName].updateValueAndValidity({ onlySelf: true });
      }
    }
    let returnData;
    if (this.config.formValueEmitMode === CrudFormValueEmitMode.ReturnAllValues || !this.config.formValueEmitMode) {
      returnData = this.dataForm.value;
    } else if (this.config.formValueEmitMode === CrudFormValueEmitMode.ReturnDirtyValues) {
      returnData = this.formService.getDirtyFormValues(this.dataForm);
    }
    this.submitButtonClick.emit(returnData);
    this.dataForm.markAllAsTouched();
    this.checkAllDataFormFieldErrors();
    this.emitValidity();
    if (this.dataForm.valid) {
      this.emitFormSubmit();
    }
  }

  onFormCancel() {
    this.cancelButtonClick.emit(true);
  }

  emitFormSubmit() {
    this.emitValidity();
    let returnData;
    if (this.config.formValueEmitMode === CrudFormValueEmitMode.ReturnAllValues || !this.config.formValueEmitMode) {
      returnData = this.dataForm.value;
    } else if (this.config.formValueEmitMode === CrudFormValueEmitMode.ReturnDirtyValues) {
      returnData = this.formService.getDirtyFormValues(this.dataForm);
    }
    this.formSubmit.emit(returnData);
  }

  emitFormValue() {
    this.emitValidity();
    let returnData;
    if (this.config.formValueEmitMode === CrudFormValueEmitMode.ReturnAllValues || !this.config.formValueEmitMode) {
      returnData = this.dataForm.value;
    } else if (this.config.formValueEmitMode === CrudFormValueEmitMode.ReturnDirtyValues) {
      returnData = this.formService.getDirtyFormValues(this.dataForm);
    }
    this.formValueChange.emit(returnData);
  }

  emitValidity() {
    if (this.dataForm) {
      this.validityChange.emit(this.dataForm.valid);
    }
  }

  emitFieldValue(value: any) {
    this.fieldValueChange.emit(value);
    this.emitFormValue();
  }

  getActiveFieldNamesFromActiveBreadcrumbOption(fieldName: string) {
    return [
      ...this.objectFieldEditModal.breadcrumbOptions?.map(option => option.data.fieldName) || [],
      fieldName
    ];
  }

  processDataPreview(item: CrudFormObjectItem): string {
    if (item.dataPreview) {
      const nestedFieldNames = this.getActiveFieldNamesFromActiveBreadcrumbOption(item.fieldName);
      const fieldValue = this.dataForm.get(nestedFieldNames).value || null;
      let text = item.dataPreview;
      item.dataPreview.match(/{{\s*[^{]*\s*}}/g).forEach(word => {
        const targetFieldName = word.match(/[^{}\s]+/g).toString();
        text = text.replace(word, fieldValue[targetFieldName] || '').trim();
      });
      return text;
    } else {
      return null;
    }
  }

  getLabelFromConfig(item: CrudFormLabelFunctionItem, data: unknown) {
    return item.functionToDisplay(item, data);
  }

  getDynamicDataForSelectbox(fieldName: string) {
    if (this.dynamicDataForSelectBox?.length) {
      const dynamicData = this.dynamicDataForSelectBox.find(data => data.fieldName === fieldName);
      return dynamicData ? dynamicData.options : [];
    }
    return [];
  }
  

  /**
   * You can use this function to route component events. ex: (close)="onItemOutputEvent('close', $event)"
   *
   * @param {string} eventName
   * @param {*} eventPayload
   * @memberof RappiderEditFormComponent
   */
  onItemOutputEvent(eventName: string, eventPayload: any) {
    this.itemOutputEvent.emit({ eventName: eventName, eventPayload: eventPayload });
  }

  // #region OBJECT FIELD EDIT MODAL FUNCTIONS

  onObjectFormItemEditClick(item: CrudFormItem) {
    /* open modal if item is in main form items */
    if (this.config.items.includes(item)) {
      this.onObjectFieldEditModalOpen(item);
    } else {
      /* create breadcrumb option */
      const breadcrumbOption = this.createBreadcrumbOptionByObjectItem(
        this.objectFieldEditModal.activeBreadcrumbOption.data.form,
        item
      );
      /* add breadcrumb option */
      this.addBreadcrumbOptionToObjectFieldEditModal(breadcrumbOption);
      /* set active breadcrumb option */
      this.setActiveBreadcrumbOptionOfObjectFieldEditModal(breadcrumbOption);
    }
  }

  showObjectFieldModal() {
    this.objectFieldEditModal.visible = true;
  }

  hideObjectFieldModal() {
    this.objectFieldEditModal.visible = false;
  }

  onObjectFieldEditModalOpen(item: CrudFormItem) {
    /* clear breadcrumb options */
    this.clearBreadcrumbOptionsInObjectFieldEditModal();
    /* show object field edit modal */
    this.showObjectFieldModal();
    /* set object field edit modal by object item ( init ) */
    this.setObjectFieldEditModalByObjectItem(this.dataForm, item);
  }

  createBreadcrumbOptionByObjectItem(form: FormGroup, item: CrudFormObjectItem): BreadcrumbOption {
    return <BreadcrumbOption>{
      label: item.title,
      data: {
        fieldName: item.fieldName,
        items: item.items,
        form: form.get(item.fieldName)
      },
      emittable: true
    };
  }

  setObjectFieldEditModalByObjectItem(form: FormGroup, item: CrudFormItem) {
    /* get breadcrumb option */
    const breadcrumbOption = this.createBreadcrumbOptionByObjectItem(form, item);
    /* add breadcrumb option */
    this.addBreadcrumbOptionToObjectFieldEditModal(breadcrumbOption);
    /* set active breadcrumb option */
    this.setActiveBreadcrumbOptionOfObjectFieldEditModal(breadcrumbOption);
  }

  onObjectFieldEditModalClose() {
    this.hideObjectFieldModal();
    this.resetObjectFieldEditModal();
  }

  onObjectFieldEditModalSubmit() {
    /*
      if breadcrumb is exist, get backward of the selected breadcrumb
      if there is no backward breadcrumb or there is no breadcrumb at all then hide modal
    */
    /* get selected breadcrumb option index */
    const selectedBreadcrumbOptionIndex = this.getSelectedBreadcrumbOptionIndexOfObjectEditModal(
      this.objectFieldEditModal.activeBreadcrumbOption
    );
    /* backward from selected breadcrumb option */
    const breadcrumbOption = this.objectFieldEditModal.breadcrumbOptions[selectedBreadcrumbOptionIndex - 1];
    if (breadcrumbOption) {
      this.onObjectFieldEditModalBreadcrumbOptionClick(breadcrumbOption);
    } else {
      this.hideObjectFieldModal();
    }
  }

  resetObjectFieldEditModal() {
    this.clearBreadcrumbOptionsInObjectFieldEditModal();
    this.objectFieldEditModal.activeBreadcrumbOption = null;
  }

  /* breadcrumb functions */

  clearBreadcrumbOptionsInObjectFieldEditModal() {
    this.objectFieldEditModal.breadcrumbOptions = [];
  }

  addBreadcrumbOptionToObjectFieldEditModal(breadcrumbOption: BreadcrumbOption) {
    this.objectFieldEditModal.breadcrumbOptions.push(breadcrumbOption);
  }

  getActiveBreadcrumbOptionInObjectFieldEditModal() {
    if (this.objectFieldEditModal?.breadcrumbOptions.length) {
      const lastIndex = this.objectFieldEditModal?.breadcrumbOptions.length - 1;
      return this.objectFieldEditModal.breadcrumbOptions[lastIndex];
    } else {
      return null;
    }
  }

  setActiveBreadcrumbOptionOfObjectFieldEditModal(breadcrumbOption: BreadcrumbOption) {
    this.objectFieldEditModal.activeBreadcrumbOption = breadcrumbOption;
  }

  onObjectFieldEditModalBreadcrumbOptionClick(breadcrumbOption: BreadcrumbOption) {
    /* slice unnecessary breadcrumbs and set it */
    const indexOfActiveBreadcrumb = this.objectFieldEditModal.breadcrumbOptions.findIndex(option => option === breadcrumbOption);
    const breadcrumbOptions = this.objectFieldEditModal.breadcrumbOptions.slice(0, indexOfActiveBreadcrumb + 1);
    this.setBreadcrumbOptionsOfObjectFieldEditModal(breadcrumbOptions);
    /* set active breadcrumb option */
    const activeBreadcrumbOption = this.getActiveBreadcrumbOptionInObjectFieldEditModal();
    this.setActiveBreadcrumbOptionOfObjectFieldEditModal(activeBreadcrumbOption);
  }

  setBreadcrumbOptionsOfObjectFieldEditModal(breadcrumbOptions: BreadcrumbOption[]) {
    this.objectFieldEditModal.breadcrumbOptions = breadcrumbOptions;
  }

  getSelectedBreadcrumbOptionIndexOfObjectEditModal(breadcrumbOption: BreadcrumbOption): number {
    const index = this.objectFieldEditModal.breadcrumbOptions?.findIndex(option => option === breadcrumbOption);
    return index !== -1 ? index : null;
  }

  // #endregion

  // #region PUBLIC FUNCTIONS

  public submit() {
    this.onFormSubmit();
  }

  public reset() {
    this.resetForm();
  }

  public getFormValue(): any {
    return this.dataForm.value;
  }

  public getFormValidity(): boolean {
    return this.dataForm.valid;
  }

  // #endregion

  // #region Slide Mode

  slideModeOkButtonClick() {
    const item = this.visibleFormItems[this.activeSlide];
    // validate existing input
    if (this.dataForm.controls[item.fieldName].valid) {
      // if its last slide save form if its not increase activeSlide 1.
      if (this.visibleFormItems?.length - 1 === this.activeSlide) {
        this.onFormSubmit();
      } else {
        this.activeSlide++;
      }
    } else {
      this.dataForm.controls[item.fieldName].markAsTouched();
      this.dataForm.controls[item.fieldName].markAsDirty();
      /* set error for changed field */
      this.checkDataFormFieldErrorsByFormItem(item);
      this.dataForm.controls[item.fieldName].updateValueAndValidity({ onlySelf: true });
    }
  }

  slideModeBackButtonClick() {
    this.activeSlide--;
  }

  // #endregion Slide Mode

  calculateRows(items: any[]): any[] {
    let currentRowWidth = 0;
    let currentRow = 1;
    const itemsWithRows = items.map(item => {
      if (currentRowWidth + item.columnWidth > 100) {
        currentRow++;
        currentRowWidth = 0;
      }
      currentRowWidth += item.columnWidth;
      return {
        ...item,
        row: currentRow
      };
    });
    return itemsWithRows.map((item) => {
      const countMatchingRows = itemsWithRows.filter(i => i.row === item.row).length;
      return {
        ...item,
        countMatchingRows: countMatchingRows
      };
    });
  }

  getFlexBasis(rowNumberItem: any) {
    const count = rowNumberItem.countMatchingRows
    const columnWidth = rowNumberItem.columnWidth;
    if (columnWidth && columnWidth !== 100) {
      const marginPerItem = (((count - 1) * 15) / count);
      return `calc(${columnWidth}% - ${marginPerItem}px)`;
    }
    if (count === 1) {
      return '100%';
    }
    if (count > 1) {
      const marginPerItem = (((count - 1) * 15) / count);
      return `calc(${(100 / count).toFixed(2)}% - ${marginPerItem}px)`;
    }
    return '100%';
  }

  onIconClick(fieldName: string) {
    this.iconClick.emit(fieldName);
  }

  transformValidators(form: any): any {
    if (!form || !form.items || !Array.isArray(form.items)) {
      return form;
    }

    form.items.forEach((item: any) => {
      if (Array.isArray(item.validators)) {
        item.validators.forEach((validator: any) => {
          if (typeof validator.type === "string" && validator.type.startsWith("Validators.")) {
            const validatorName = validator.type.split("(")[0].split(".")[1];

            if (validator.type.includes("(")) {
              const param = validator.type.match(/\(([^)]+)\)/);
              if (param) {
                if (Validators[validatorName]) {
                  item.validators[item.validators.indexOf(validator)].type = Validators[validatorName](+param[1]);
                }
              }
            } else {
              if (Validators[validatorName]) {
                item.validators[item.validators.indexOf(validator)].type = Validators[validatorName];
              }
            }
          }
        });
      }
    });

    return form;
  }


}
