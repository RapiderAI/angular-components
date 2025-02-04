
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { CrudFormItem } from './crud-form-item.interface';
import { CrudFormPreviewerItem } from './crud-form-previewer-item.interface';

export interface CrudFormImageUploadItem extends CrudFormItem {
  uploadedImage: ImageComponentConfig;
  uploadButtonVisibility: boolean;
  isLoading: boolean;
  uploadButton: ButtonComponentConfig;
  previewerConfig: CrudFormPreviewerItem;
}
