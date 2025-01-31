import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ValidatorOptions } from './validator-options.interface';

// custom validator to check that two fields match
export function UniqueValidator(controlName: string, options?: ValidatorOptions) {
  return (formArray: FormArray) => {
    const errorName = options?.errorName || 'unique';
    const nonUniqueIndexes = [];
    const formArrayValue = <any[]>formArray.value;

    formArrayValue
      .map(row => row[controlName])
      .forEach((value, index, array) => {
        if (value) {
          const condition = array.findIndex(item => item === value) === index;
          if (!condition) {
            nonUniqueIndexes.push(index);
          }
        }
      });

      formArray.controls.forEach((control: AbstractControl) => {
        const form = control as FormGroup;
        let errors = form.controls[controlName]?.errors;
        if (errors) {
          delete errors[errorName];
          errors = Object.keys(errors).length ? errors : null;
          form.setErrors(errors);
        }
      });
      

    nonUniqueIndexes.forEach(index => {
      const control = (<FormGroup>formArray.controls[index]).controls[controlName];
      const errors = control.errors || {};
      errors[errorName] = true;
      control.setErrors(errors);
    });
  };
}
