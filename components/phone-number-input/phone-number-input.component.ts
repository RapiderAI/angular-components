import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RappiderTextboxComponent, TextboxComponentConfig } from '@rapider/angular-components/textbox';
import { RappiderSelectComponent, SelectComponentConfig } from '@rapider/angular-components/select';
import { PhoneNumberInput } from '@rapider/angular-components/core/phone-number-input';
import { countries } from '@rapider/angular-components/core/phone-number-input';
import { phoneNumber } from './utils/index';
import { IconType } from '@rapider/angular-components/core/icon';
import { cloneDeep } from 'lodash';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rappider-phone-number-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RappiderSelectComponent,
    RappiderTextboxComponent,
    TranslateModule
  ],
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderPhoneNumberInputComponent),
      multi: true
    }
  ]
})
export class RappiderPhoneNumberInputComponent implements OnInit, ControlValueAccessor {

  /* for rappider-select */
  @Input() selectConfig: SelectComponentConfig;
  @Input() mask = '';
  @Input() iconType: IconType = IconType.FontAwesome;

  /* for rappider-textbox */
  @Input() textboxConfig: TextboxComponentConfig;

  isPhoneNumber = true;
  isValid = false;
  maskLength = 0;
  _value: PhoneNumberInput;

  ngOnInit(): void {
    this.setCountryValues();
  }

  get value() {
    return this._value;
  }

  set value(val: PhoneNumberInput) {
    this._value = val;
    this.onChange(val);
    this.onTouched(val);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: PhoneNumberInput) {
    if (value) {
      this._value = value;
    } else {
      this.initDefault();
    }
  }

  initDefault() {
    this._value = cloneDeep(phoneNumber);
  }

  registerOnChange(fn: PhoneNumberInput) {
    this.onChange = fn;
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  setCountryValues() {
    /*
    ** Generating options to pass to Select
    */
    this.selectConfig.grouppedOptions = countries.map(country => ({
      label: country.countryCode + ' ' + country.name,
      value: country.countryCode + ' ' + country.iso,
      groupLabel: country.label
    }));
  }

  onSelectValueChange(selectValue: string) {
    // When value in rappider-select changes and is not null
    if (selectValue) {
      countries.forEach(country => {
        /* We split the value in selectValue by space
        ** example selectValue: +90 TR
        */
        const code = selectValue.split(' ');
        /*
        ** We compare the value at index 0 of the split value (eg: +90) with countryCode and the value at index 1 of the split value (eg: TR) with iso
        ** otherwise, for countries with more than one same countryCode, it chooses the first country it finds
        */
        if (code[0] === country.countryCode && code[1] === country.iso) {
          /*
          ** The type of mask of some countries is array so type is checked here
          */
          if (typeof country.mask === 'string') {
            // placeholder value updating according to mask
            this.textboxConfig = {
              ...this.textboxConfig,
              placeholder: country?.mask
            };
            /* We make 0 non-0 characters in mask
            ** if we don't we can't enter characters
            */
            this.mask = country.mask.replace(/[0-9]/g, '0');
          } else {
            // if mask is an array we get the first element of the array
            this.textboxConfig.placeholder = country.mask[0];
            this.mask = country.mask[0].replace(/[0-9]/g, '0');
          }
        }
      });

      /* When selectValue changes, if there is a value in the textbox, it is updated according to the size of the mask of the newly selected country.
      * There is a bug caused by mask or textbox.
      * If the mask size of the newly selected country is larger than the previous mask size, there is data inconsistency.
      * (*) added as temporary solution.
      */
      this.maskLength = this.mask.replace(/[^a-zA-Z0-9]/g, '').length;
      if (this.value.number && this.maskLength < this.value.number.length) {
        this.value.number = this.value.number.substring(0, this.maskLength);
      } else if (this.value.number && this.maskLength > this.value.number.length) {
        const valueNumberLength = this.value.number.length;
        this.value.number += '*'.repeat(this.maskLength - valueNumberLength);
      }
    }
    this.triggerValueChange();
  }

  triggerValueChange() {
    this.value = {
      ...this.value
    };
  }
}
