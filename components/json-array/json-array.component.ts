import { Component, forwardRef, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { JsonArrayComponentOption } from '../../utils';
import { cloneDeep } from 'lodash';
import { RappiderDataOrderService,NotificationService } from '@rapider/angular-components/core/services';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { RADIO_GROUP_COMPONENT_CONFIG,JSON_ARRAY_LIST_GRID_CONFIG,JSON_ARRAY_EMPTY_LIST_CONFIG } from '@rapider/angular-components/core/json-array';
import { CrudViewColumnType } from '../../utils/list-grid/crud-view-column-type.enum';
import { OrderChangeOutput } from '../../utils/list-grid/order-change-output.interface';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RappiderModalComponent } from '../modal';
import { CodeEditorComponent } from '../code-editor';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderButtonComponent } from '../button';
import { RappiderRadioGroupComponent } from '../radio-group';
import { RappiderSpinComponent } from '../spin';

@Component({
  selector: 'rappider-json-array',
  templateUrl: './json-array.component.html',
  imports:[
    CommonModule,
    FormsModule,
    NzButtonComponent,
    RappiderModalComponent,
    CodeEditorComponent,
    // RappiderListGridModule,
    TranslateModule,
    ReactiveFormsModule,
    RappiderButtonComponent,
    RappiderRadioGroupComponent,
    RappiderSpinComponent
  ],
  standalone: true,
  styleUrls: ['./json-array.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderJsonArrayComponent),
      multi: true
    }
  ]
})
export class RappiderJsonArrayComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() previewFieldNames: string[];
  @Input() button: ButtonComponentConfig;
  @Input() modalTitle: string;

  @Output() blur = new EventEmitter<any>();

  /**
   * Json Array Value
   *
   * @type {any[]}
   * @memberof JsonArrayComponent
   */
  _value: any;
  localeValue: string;
  /* configs */
  JSON_ARRAY_LIST_GRID_CONFIG = cloneDeep(JSON_ARRAY_LIST_GRID_CONFIG);
  JSON_CODEMIRROR_SETTINGS = {
    theme: 'vs-dark',
    language: 'json',
    minimap: { autohide: true, enabled: false },
    lineNumbers: { renderType: 0 }
  };
  /* flags */
  isModalVisible = false;
  openCodemirror = false;
  /* local values */
  currentIndex: number;
  currentValue: any;

  componentOption = JsonArrayComponentOption.GridView;
  ComponentOption = JsonArrayComponentOption;
  radioGroupComponentConfig = RADIO_GROUP_COMPONENT_CONFIG;
  codeEditorVisible = false;
  /* This variable is used to switch the visibility of the Monaco editors on the page as we need to wait Monaco js code to complete the initializing process to switch the visibility*/
  monacoEditorLoadTime = 50;
  JSON_ARRAY_EMPTY_LIST_CONFIG = JSON_ARRAY_EMPTY_LIST_CONFIG;

  get value() {
    return this._value ?? [];
  }

  set value(value: any) {
    this._value = value ?? [];
    this.onChange(value);
    this.onTouched();
    this.setListGridConfig();
    this.blur.emit(value);
  }

  constructor(
    private notificationService: NotificationService,
    private dataOrderService: RappiderDataOrderService
  ) { }

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (!this.button) {
      this.button = {
        ...this.button,
        icon: {
          name: 'fas fa-plus',
        },
        text: 'Add New Item'
      };
    }
    if (!this.modalTitle) {
      this.modalTitle = 'SHARED.EDIT';
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
    this.JSON_ARRAY_LIST_GRID_CONFIG = { ...this.JSON_ARRAY_LIST_GRID_CONFIG };
    this.setListGridConfig();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * on value change method
   *
   * @memberof JsonArrayComponent
   */
  onValueChange() {
    try {
      const currentStringValue = JSON.parse(this.currentValue);
      /* checks if changed value is an edited value */
      if (this.currentIndex || this.currentIndex === 0) {
        /* find current object and change it to edited value*/
        try {
          this.value[this.currentIndex] = currentStringValue;
          this.closeJsonArrayModal();
          /* refresh value */
          this.refreshValue();
        } catch (error) {
          this.notificationService.createNotification(
            'error',
            'SHARED.ERROR',
            'JSON format is wrong. Please enter a valid JSON'
          );
        }

      } else {
        /* if the value is new (doesn't have a current index) push it to value. */
        try {
          /* parse json  */
          this.value.push(currentStringValue);
          this.closeJsonArrayModal();
          /* refresh value */
          this.refreshValue();
        } catch (error) {
          this.notificationService.createNotification(
            'error',
            'SHARED.ERROR',
            'JSON format is wrong. Please enter a valid JSON'
          );
        }
      }

    } catch (error) {
      this.notificationService.createNotification(
        'error',
        'SHARED.ERROR',
        'JSON format is wrong. Please enter a valid JSON'
      );
    }
  }

  /**
   * refresh value to trigger angular change detection
   *
   * @memberof JsonArrayComponent
   */
  refreshValue() {
    this.value = [...this.value];
  }

  /**
   * sets the list grid config
   *
   * @memberof JsonArrayComponent
   */
  setListGridConfig() {
    let columns = [];
    if (this.previewFieldNames?.length) {
      columns = this.previewFieldNames.map(fieldName => ({
        title: fieldName,
        fieldName: fieldName,
        type: CrudViewColumnType.Text
      }));
      this.JSON_ARRAY_LIST_GRID_CONFIG.columns = columns;
    } else {
      if (this.value?.length) {
        this.value?.forEach(item => {
          Object.keys(item)?.forEach(itemKey => {
            if (!columns.some(item => item.fieldName === itemKey)) {
              columns.push({
                title: itemKey,
                fieldName: itemKey,
                type: CrudViewColumnType.Text
              });
            }
          });
        });
        /* to convert 2dimensional array to 1 dimensional array */
        columns = [].concat(...columns);
        this.JSON_ARRAY_LIST_GRID_CONFIG.columns = columns;
      }
    }

  }

  /**
   * Fires when item action clicked
   *
   * @param {*} event
   * @memberof JsonArrayComponent
   */
  itemActionClick(event: any) {
    /* gets the index of item */
    const index = event.rowIndex;
    /* checks the action type */
    if (event.action.name === 'EDIT') {
      /* stringify value then assign to current value */
      this.currentValue = JSON.stringify(this.value[index]);
      /* sets the current index */
      this.currentIndex = index;
      /* opens modal */
      this.openJsonArrayModal();
      setTimeout(() => {
        this.codeEditorVisible = true;
      }, this.monacoEditorLoadTime);
      /*
       * sets true after 500ms
       * used to render the codemirror component properly as codemirror gutter doesn't initialized as it should be.
       */
      setTimeout(() => this.openCodemirror = true, 500);
    } else if (event.action.name === 'DELETE') {
      /* deletes the value */
      this.value = this.value.filter(item => item !== this.value[index]);
    }
  }

  /**
   * fires when add new button clicked
   *
   * @memberof JsonArrayComponent
   */
  addNewJson() {
    this.openCodemirror = true;
    /* resets current value */
    this.currentValue = '';
    /* resets current index */
    this.currentIndex = null;
    /* opens modal */
    this.isModalVisible = true;
    setTimeout(() => {
      this.codeEditorVisible = true;
    }, this.monacoEditorLoadTime);
  }

  /**
   * list grid order change
   *
   * @param {OrderChangeOutput} output
   * @memberof JsonArrayComponent
   */
  onOrderChange(output: OrderChangeOutput) {
    const orderedValue = this.dataOrderService.changeOrderByStartAndEndIndex(
      this.value,
      output.data,
      output.orderStartIndex,
      output.orderEndIndex
    );
    this.value = orderedValue;
  }

  closeJsonArrayModal() {
    this.currentValue = null;
    this.isModalVisible = false;
    this.openCodemirror = false;
    this.codeEditorVisible = false;
    this.JSON_ARRAY_LIST_GRID_CONFIG = { ...this.JSON_ARRAY_LIST_GRID_CONFIG };
  }

  openJsonArrayModal() {
    this.isModalVisible = true;
  }

  onComponentOptionChange(option: JsonArrayComponentOption) {
    if (option === JsonArrayComponentOption.CodeMirror) {
      this.localeValue = JSON.stringify(this.value);
      /*
       * sets true after 500ms
       * used to render the codemirror component properly as codemirror gutter doesn't initialized as it should be.
       */
      setTimeout(() => this.openCodemirror = true, 500);
    }
    if (option === JsonArrayComponentOption.GridView) {
      if (this.value && this.value.length > 0) {
        try {
          this.value = JSON.parse(this.value);
        } catch {
          this.value = this.value || [];
        }
      }
    }
    this.componentOption = option;
  }

  onCodemirrorValueChange(value) {
    this.localeValue = value;
  }

  onCodemirrorSave() {
    try {
      this.value = JSON.parse(this.localeValue);
      this.notificationService.createNotification(
        'success',
        'SHARED.SUCCESSFUL',
        'Json Saved Successfully'
      );
    } catch (error) {
      this.notificationService.createNotification(
        'error',
        'SHARED.ERROR',
        'JSON format is wrong. Please enter a valid JSON'
      );
    }
  }

}
