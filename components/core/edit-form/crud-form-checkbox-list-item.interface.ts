import { ButtonComponentConfig } from '../button/button-component-config.interface';
import { CheckboxList, CheckboxListDirection } from '../checkbox-list';
import { HeadingComponentConfig } from '../heading/heading-component-config.interface';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormCheckboxListItem extends CrudFormItem {
  direction?: CheckboxListDirection;
  header?: HeadingComponentConfig;
  options?: CheckboxList[];
  button?: ButtonComponentConfig;
}
