import { AbstractControl } from '@angular/forms';
import { countries } from '@rapider/angular-components/core/phone-number-input';

// custom validator to check the select and textbox values of phone-number-input component
export function ValidatePhoneNumber(control: AbstractControl) {
  // only if select value is selected
  if (control.value?.code && control.value?.number) {
    // If both are full, item is searched in countries according to select value
    const item = countries.find((element) => control.value?.code === (element.countryCode + ' ' + element.iso));
    // Getting size of entered number
    const phoneLength = control.value?.number.length;
    /* When selectValue changes, if there is a value in the textbox, it is updated according to the size of the mask of the newly selected country.
    * There is a bug caused by mask or textbox.
    * If the mask size of the newly selected country is larger than the previous mask size, there is data inconsistency.
    * (*) added as temporary solution. So we check this situation.
    * */
    const isIncludes = control.value?.number.includes('*');

    const mask = typeof item.mask === 'string' ? item.mask : item.mask[0];
    const itemLength = mask.replace(/[^a-zA-Z0-9]/g, '').length;

    // if number does not contain (*) and itemLength is equal to phoneLength then number is entered correctly.
    if (itemLength === phoneLength && !isIncludes) {
      return null;
    } else {
      return { 'validatePhoneNumber': true };
    }
  } else {
    return { 'validatePhoneNumber': true };
  }
}
