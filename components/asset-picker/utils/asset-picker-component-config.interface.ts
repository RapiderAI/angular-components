import { NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd/tree';
import { ButtonComponentConfig } from '@rapider/angular-components/button';

export interface AssetPickerComponentConfig {
    basePath: string;
    folderTree?: NzTreeNodeOptions[];
    headerButtons?: ButtonComponentConfig[];
    detailFooterButtons?: ButtonComponentConfig[];
    /**
     * pass visibility function for handle visibility of header buttons
     * @default true
     *
     * @param buttonKey
     * @param selectedItem
     * @param buttonKey
     * @memberof RappiderAssetPickerComponent
     */
    headerButtonVisibilityFunction?: (
        buttonKey: string,
        selectedItem: NzTreeNodeOptions,
        activeFolder: NzTreeNode
    ) => boolean;
    /**
     * pass visibility function for handle visibility of detail footer buttons
     * @default true
     *
     * @param buttonKey
     * @param selectedItem
     * @param buttonKey
     * @memberof RappiderAssetPickerComponent
     */
    detailFooterButtonVisibilityFunction?: (
        buttonKey: string,
        selectedItem: NzTreeNodeOptions,
        activeFolder: NzTreeNode
    ) => boolean;
}
