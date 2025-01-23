import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxListDirection } from '@rapider/angular-components/core/checkbox-list';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderHeadingComponent, HeadingComponentConfig } from '@rapider/angular-components/heading';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { RappiderCheckboxComponent } from '@rapider/angular-components/checkbox';



@Component({
  selector: 'rappider-checkbox-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RappiderHeadingComponent,
    RappiderButtonComponent,
    RappiderCheckboxComponent
  ],
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderCheckboxListComponent),
      multi: true
    }
  ]
})
export class RappiderCheckboxListComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() direction = CheckboxListDirection.Column;
  @Input() header: HeadingComponentConfig;
  @Input() options: CheckboxList[];
  @Input() button: ButtonComponentConfig;
  @Input() isSelectAllButtonVisible = false;
  @Input() initialValue: string[];

  @Output() itemSelected = new EventEmitter<string[]>();
  @Output() buttonClick = new EventEmitter<void>();

  selectAll = false;
  Direction = CheckboxListDirection;
  mappedOptions: MappedCheckboxList[];
  _value: string[] = [];
  selectAllText: TextComponentConfig = {
    text: 'Select All',
  };

  get value() {
    return this._value;
  }

  set value(value: string[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.itemSelected.emit(this.value);
  }

  ngOnInit(): void {
    this.writeValue(this.value);
    this.setInitialValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this._value = this.options?.filter(option => option.isSelected).map(item => item.value);
      this.writeValue(this.value);
    }
    if (changes.initialValue) {
      this.setInitialValue();
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(val: string[]) {
    this._value = val || [];
    this.mappedOptions = this.options;
  }

  setInitialValue() {
    this._value = this.initialValue || [];
    this.mappedOptions = this.mappedOptions?.map(option => {
      return {
        ...option,
        isSelected: this.initialValue?.some(value => value === option?.value)
      }
    });
  }

  mapOptions() {
    this.mappedOptions = this.options?.map(option => {
      if (this.value?.some(valueItem => valueItem === option.value)) {
        return {
          ...option,
          isSelected: true
        };
      } else {
        return {
          ...option,
          isSelected: false
        };
      }
    });
  }

  onValueChange(checkboxItem: any) {
    if (checkboxItem.isSelected) {
      this.value = [...this.value, checkboxItem.value];
    } else {
      this.value = this.value.filter(item => item !== checkboxItem.value);
    }
    this.updateSelectAll();
  }

  onButtonClick() {
    this.buttonClick.emit();
  }

  onSelectAllChange() {
    if (this.selectAll) {
      this.value = this.options.map(option => option.value);
      this.selectAllText.text = 'Deselect All';
    } else {
      this.value = [];
      this.selectAllText.text = 'Select All';
    }
    this.mapOptions();
  }

  updateSelectAll() {
    if (this.options) {
      this.selectAll = this.value.length === this.options.length;
      this.selectAllText.text = this.selectAll ? 'Deselect All' : 'Select All';
    }
  }
}
