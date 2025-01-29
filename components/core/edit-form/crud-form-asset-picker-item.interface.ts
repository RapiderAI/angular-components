import { AssetPickerComponentConfig } from '../asset-picker/asset-picker-component-config.interface';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormAssetPickerItem extends CrudFormItem {
    assetPickerConfig?: AssetPickerComponentConfig;
}
