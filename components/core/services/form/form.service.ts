import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  getDirtyFormValues(form: any): any {
    const dirtyValues = {};
    Object.keys(form.controls).forEach(key => {
      const currentControl = form.controls[key];
      if (currentControl.touched && !currentControl.pristine) {
        dirtyValues[key] = currentControl.controls ? this.getDirtyFormValues(currentControl) : currentControl.value;
      }
    });
    return dirtyValues;
  }

  getActiveErrorKeys(formGroup: FormGroup, fieldName: string) {
    const errors = formGroup.get(fieldName)?.errors;
    const isTouched = formGroup.get(fieldName)?.touched;

    if (isTouched && errors) {
      return Object.keys(errors);
    } else {
      return [];
    }
  }

  /**
   * mark form elements as dirty
   *
   * @param {FormGroup} form
   * @memberof FormService
   */
  checkFormValidation(form: FormGroup) {
    for (const key in form.controls) {
      if (key) {
        form.controls[key].markAsDirty();
        form.controls[key].updateValueAndValidity();
      }
    }
  }

  createFormByData(data: { [key: string]: any }): FormGroup {
    const formValue = {};
    for (const [key, value] of Object.entries(data)) {
      formValue[key] = [value];
    }
    return this.formBuilder.group(formValue);
  }

  checkAllFormValidations(form: FormGroup) {
    /* make form elements as dirty */
    // tslint:disable-next-line: forin
    for (const key in form.controls) {
      if (key) {
        const control = form.controls[key];
        if (control instanceof FormControl) {
          this.validateControl(control);
        } else if (control instanceof FormGroup) {
          this.checkFormValidation(control);
        } else if (control instanceof FormArray) {
          const formGroups: FormGroup[] = <FormGroup[]>control.controls;
          for (const formGroup of formGroups) {
            this.checkAllFormValidations(formGroup);
          }
        }
      }
    }
  }

  validateControl(control: AbstractControl) {
    control.markAsDirty();
    control.updateValueAndValidity();
  }

}
