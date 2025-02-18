import { CrudFormItem } from './crud-form-item.interface';
import { CrudFormPreviewerItem } from './crud-form-previewer-item.interface';

export interface CrudFormDocumentUploadItem extends CrudFormItem {
  previewerConfig?: CrudFormPreviewerItem;
}
