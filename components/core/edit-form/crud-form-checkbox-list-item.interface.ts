import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { CheckboxList, CheckboxListDirection } from '@rapider/angular-components/core/checkbox-list';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormCheckboxListItem extends CrudFormItem {
  direction?: CheckboxListDirection;
  header?: HeadingComponentConfig;
  options?: CheckboxList[];
  button?: ButtonComponentConfig;
}
