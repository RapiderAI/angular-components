
import { ButtonComponentConfig } from '../button';
import { ImageComponentConfig } from '../image';
import { CrudFormItem } from './crud-form-item.interface';
import { CrudFormPreviewerItem } from './crud-form-previewer-item.interface';

export interface CrudFormImageUploadItem extends CrudFormItem {
  uploadedImage: ImageComponentConfig;
  uploadButtonVisibility: boolean;
  isLoading: boolean;
  uploadButton: ButtonComponentConfig;
  previewerConfig: CrudFormPreviewerItem;
}
