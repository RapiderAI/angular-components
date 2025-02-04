import { AssetPickerComponentConfig } from '@rapider/angular-components/asset-picker';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormAssetPickerItem extends CrudFormItem {
  assetPickerConfig?: AssetPickerComponentConfig;
}
