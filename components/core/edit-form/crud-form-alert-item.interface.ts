import { AlertConfig } from '../alert';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormAlertItem extends CrudFormItem {
  alert?: AlertConfig;
}
