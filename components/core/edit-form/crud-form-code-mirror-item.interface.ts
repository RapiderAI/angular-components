import { CodeMirrorSettings } from '@rapider/angular-components/core/codemirror';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormCodeMirrorItem extends CrudFormItem {
  settings?: CodeMirrorSettings;
}
