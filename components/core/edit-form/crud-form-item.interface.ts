import { CrudFormItemMenu } from './crud-form-item-menu.interface';
import { CrudFormItemValidator } from './crud-form-item-validator.interface';
import { CrudViewFormItemType } from './crud-view-form-item-type.enum';

export interface CrudFormItem {
  columnWidth?: number;
  title?: string;
  fieldName?: string;
  placeholder?: string;
  type: CrudViewFormItemType;
  description?: string;
  mask?: string;
  hint?: string;
  /* icon css class */
  //labelIcon?: IconComponentConfig;
  index?: number;
  /* adds (*) character as prefix to title  */
  showRequiredSign?: boolean;
  /* adds (:) character as suffix to title  */
  showColonSign?: boolean;
  validators?: CrudFormItemValidator[];
  cssClass?: string;
  cssStyle?: { [key: string]: any };
  visible?: boolean;
  loading?: boolean;
  menu?: CrudFormItemMenu;
  section?: string;
  metadata?: Record<string, any>;
  /* default value for item */
  default?: any;
  /* if true, then this field is linked to another field and gets the values of the field it is attached to */
  isLinked?: boolean;
  /* name of the linked field */
  linkedFieldName?: string;
  /* data transformation function for linked field value. the function can take the value of the linked field as a parameter */
  linkDataTransformationFunction?: Function;
  settings?: any;
  labelDescription?: string;
  options?: any;
}
