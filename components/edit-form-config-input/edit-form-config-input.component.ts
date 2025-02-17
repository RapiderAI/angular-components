import { Component, forwardRef, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NotificationService } from '@rapider/angular-components/core/services';
import { CheckboxComponentConfig, RappiderCheckboxComponent } from '@rapider/angular-components/checkbox';
import { InputSize } from '@rapider/angular-components/core/style';
import { CrudFormConfigInputChangeReaction } from '@rapider/angular-components/core/edit-form';
import { CrudFormConfigSubmitButton } from '@rapider/angular-components/core/edit-form';
import { CrudFormConfigValidators } from '@rapider/angular-components/core/edit-form';
import { CrudFormConfig } from '@rapider/angular-components/core/edit-form';
import { FormLayout } from '@rapider/angular-components/core/edit-form';
import { JSON_CODEMIRROR_SETTINGS } from '@rapider/angular-components/core/json-array';
import { SINGLE_NOT_SEARCHABLE_SELECT_SETTINGS } from '@rapider/angular-components/core/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CommonModule } from '@angular/common';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderInputLabelComponent } from '@rapider/angular-components/input-label';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderModalComponent } from '@rapider/angular-components/modal';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderCodeEditorComponent } from '@rapider/angular-components/code-editor-wrapper';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RappiderJsonArrayComponent } from '@rapider/angular-components/json-array';

@Component({
  selector: 'rappider-edit-form-config-input',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RappiderButtonComponent,
    RappiderModalComponent,
    RappiderInputLabelComponent,
    RappiderJsonArrayComponent,
    RappiderSelectComponent,
    RappiderCodeEditorComponent,
    RappiderTextboxComponent,
    RappiderCheckboxComponent,
    NzButtonModule,
    NzPopoverModule,
  ],
  templateUrl: './edit-form-config-input.component.html',
  styleUrls: ['./edit-form-config-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderEditFormConfigInputComponent),
      multi: true
    }
  ]
})
export class RappiderEditFormConfigInputComponent implements OnInit, ControlValueAccessor {

  @Input() checkbox: CheckboxComponentConfig;

  @Output() blur = new EventEmitter<CrudFormConfig>();

  /* settings for codemirror component */
  JSON_CODEMIRROR_SETTINGS = JSON_CODEMIRROR_SETTINGS;
  /**
   * local value
   *
   * @type {CrudFormConfig}
   * @memberof EditFormConfigInputComponent
   */
  _value: CrudFormConfig;

  /* local variables */
  /* form layout data for CrudFormConfig*/
  formLayout: FormLayout;
  /* input change reaction data for CrudFormConfig */
  inputChangeReactions = [];
  /* items data for CrudFormConfig */
  items: any[];
  /* item settings data for CrudFormConfig */
  itemSettings: any;
  /* validators data for CrudFormConfig */
  validators: CrudFormConfigValidators[] = [];
  /* submit button data for CrudFormConfig */
  submitButton: CrudFormConfigSubmitButton;

  /* select component settings for form layout*/
  formLayoutOptions = [];
  /* select component settings for input sizes */
  inputSizes = [];
  /* select component settings for submitButton */
  inputChangeReaction: CrudFormConfigInputChangeReaction;

  /* settings for select component */
  SINGLE_SELECT_SETTINGS = SINGLE_NOT_SEARCHABLE_SELECT_SETTINGS;

  /* modal visible states */
  editSubmitButtonSettingsModalVisible = false;
  editFormConfigInputVisible = false;
  itemSettingsModalVisible = false;

  /* default values flag */
  isDefaultValuesAdded = false;

  /* preview field names for json array component */
  itemsPreviewFieldNames = ['title', 'fieldName', 'type'];
  validatorsPreviewFieldNames = ['name', 'validator'];

  get value() {
    return this._value;
  }

  set value(value: CrudFormConfig) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getEditFormLayoutOptions();
    this.getInputChangeReactions();
    this.getInputSizes();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value): void {
    this._value = value || {};
    this.getFieldValues();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleCancel() {
    this.editSubmitButtonSettingsModalVisible = false;
  }

  /**
   * gets the form layout options
   *
   * @memberof EditFormConfigInputComponent
   */
  getEditFormLayoutOptions() {
    this.formLayoutOptions = Object.values(FormLayout).map(value => ({
      key: value,
      value: value
    }));
  }

  /**
   * gets the input change reactions
   *
   * @memberof EditFormConfigInputComponent
   */
  getInputChangeReactions() {
    this.inputChangeReactions = Object.values(CrudFormConfigInputChangeReaction).map(value => ({
      key: value,
      value: value
    }));
  }

  getInputSizes() {
    this.inputSizes = Object.entries(InputSize).map(([key, value]) => ({
      key: key,
      value: value
    }));
  }

  /**
   * opens edit submit button settings modal
   *
   * @memberof EditFormConfigInputComponent
   */
  openEditSubmitButtonSettingsModal() {
    this.editSubmitButtonSettingsModalVisible = true;
  }

  /**
   * takes the submit button value and assign it to value.submitButton
   *
   * @memberof EditFormConfigInputComponent
   */
  onSubmitButtonSettingsChange() {
    this.value.submitButton = this.submitButton;
    this.editSubmitButtonSettingsModalVisible = false;
  }

  getSubmitButtonData() {
    const defaultSubmitButtonData = <CrudFormConfigSubmitButton>{
      size: 'default',
      visible: true,
      text: 'Submit'
    };
    this.submitButton = this.value?.submitButton ? this.value.submitButton : defaultSubmitButtonData;
  }

  getItemsData() {
    this.items = this.value?.items || [];
  }

  getFormLayoutData() {
    this.formLayout = this.value?.formLayout ? this.value.formLayout : FormLayout.Vertical;
  }

  getInputChangeReactionData() {
    this.inputChangeReaction = this.value?.inputChangeReaction ? this.value.inputChangeReaction : CrudFormConfigInputChangeReaction.Default;
  }

  getItemSettingsData() {
    this.itemSettings = this.value?.itemSettings ? JSON.stringify(this.value.itemSettings) : '';
  }

  onInputChangeReactionChange() {
    this.value.inputChangeReaction = this.inputChangeReaction;
  }

  onFormLayoutChange(value: FormLayout) {
    this.value.formLayout = value;
  }

  /**
   * gets the data and assign them to local variables.
   *
   * @memberof EditFormConfigInputComponent
   */
  getFieldValues() {
    this.getEditFormLayoutOptions();
    this.getFormLayoutData();
    this.getInputChangeReactionData();
    this.getSubmitButtonData();
    this.getItemsData();
    this.getItemSettingsData();
    this.isDefaultValuesAdded = true;
  }

  onEditFormButtonClick() {
    this.editFormConfigInputVisible = true;
  }

  hideEditFormModal() {
    this.editFormConfigInputVisible = false;
  }

  onEditFormConfigSubmit() {
    this.value = { ...this.value };
    this.blur.emit(this.value);
    this.editFormConfigInputVisible = false;
  }

  onItemsChange() {
    this.value.items = this.items;
  }

  onValidatorsChange() {
    this.value.validators = this.validators;
  }

  onItemSettingsChange() {
    try {
      this.value.itemSettings = JSON.parse(this.itemSettings);
      this.itemSettingsModalVisible = false;
    } catch (error) {
      this.notificationService.createNotification('error', 'Error', 'CRUD_VIEW_MODULE.JSON_ARRAY_COMPONENT.WRONG_JSON_FORMAT');
    }
  }

  openItemSettingsModal() {
    this.itemSettingsModalVisible = true;
  }

  closeItemSettingsModal() {
    this.itemSettingsModalVisible = false;
  }
}
