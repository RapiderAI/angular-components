import { Component, OnInit, Input, Output, EventEmitter, forwardRef, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCascaderComponent, NzCascaderOption } from 'ng-zorro-antd/cascader';

import { CommonModule } from '@angular/common';
import { InputSize } from '@rapider/angular-components/core/style';
import { CascadeTriggerMode } from '@rapider/angular-components/core/cascader';

@Component({
  selector: 'rappider-cascader',
  templateUrl: './cascader.component.html',
  styleUrls: ['./cascader.component.scss'],
  imports:[
    CommonModule,
    NzCascaderComponent
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderCascaderComponent),
      multi: true,
    },
  ],
})
export class RappiderCascaderComponent implements ControlValueAccessor, OnInit {


  /**
   * Cascader options array
   * 
   * This is the hierarchical data structure to populate the cascader.
   * Default: []
   * @type {NzCascaderOption[]}
   * @memberof RappiderCascaderComponent
   */
  @Input() options: NzCascaderOption[] = [];

  /**
   * Placeholder for the input field
   * 
   * Default: 'Please select'
   * @type {string}
   * @memberof RappiderCascaderComponent
   */
  @Input() placeholder: string;

  /**
   * Disables the cascader component
   * 
   * Default: false
   * @type {boolean}
   * @memberof RappiderCascaderComponent
   */
  @Input() disabled: boolean;

  /**
   * Enables search functionality within the cascader
   * 
   * Default: true
   * @type {boolean}
   * @memberof RappiderCascaderComponent
   */
  @Input() showSearch: boolean;

  /**
   * Allows clearing the selected value
   * 
   * Default: true
   * @type {boolean}
   * @memberof RappiderCascaderComponent
   */
  @Input() allowClear: boolean;

  /**
   * Specifies the size of the cascader input
   * 
   * Available values: 'large', 'default', 'small'
   * Default: 'default'
   * @type {'large' | 'default' | 'small'}
   * @memberof RappiderCascaderComponent
   */
  @Input() size: InputSize;


  /**
   * Trigger method to expand submenus
   * 
   * Available values: 'click', 'hover'
   * Default: 'click'
   * @type {'click' | 'hover'}
   * @memberof RappiderCascaderComponent
   */
  @Input() expandTrigger: CascadeTriggerMode;

  /**
   * Enables selection change on submenu items
   * 
   * Default: false
   * @type {boolean}
   * @memberof RappiderCascaderComponent
   */
  @Input() changeOnSelect: boolean;

  /**
   * Adds a backdrop when dropdown is visible
   * 
   * Default: false
   * @type {boolean}
   * @memberof RappiderCascaderComponent
   */
  @Input() backdrop: boolean;

  /**
   * Property name for values in options
   * 
   * Default: 'value'
   * @type {string}
   * @memberof RappiderCascaderComponent
   */
  @Input() valueProperty: string;

  /**
   * Conditions for changing selection
   * 
   * Default: null
   * @type {(option: NzCascaderOption, level: number) => boolean}
   * @memberof RappiderCascaderComponent
   */
  @Input() changeOn: (option: NzCascaderOption, level: number) => boolean;

  @Input() labelRender: TemplateRef<any>;

  /**
   * Emits the selected value
   * 
   * @memberof RappiderCascaderComponent
   */
  @Output() valueChange = new EventEmitter<any>();



  _value: any;

  ngOnInit(): void {
    console.log(this.options)
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

  onValueChange(value: any): void {
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}
