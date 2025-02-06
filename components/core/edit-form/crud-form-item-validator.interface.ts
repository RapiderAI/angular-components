export interface CrudFormItemValidator {
  type?: any; /* only Validators functions can be used => e.g. Validators.required */
  errorKey: string; /* e.g. 'required' for Validators.required  */
  errorMessage?: string;
}
