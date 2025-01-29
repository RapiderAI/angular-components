import { SizeConfig } from '../shared';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormMonacoCodeEditorItem extends CrudFormItem {
  editorOptions: any;
  sizeSettings: SizeConfig;
  pasteItemFn?: any;
  autoFormat?: boolean;
}
