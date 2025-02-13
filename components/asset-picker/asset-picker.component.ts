/* eslint-disable @typescript-eslint/member-ordering */

import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { folderPlaceholderIconPath, imageFileTypes } from '@rapider/angular-components/core/asset-browser';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { ButtonSize, ButtonType } from '@rapider/angular-components/core/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RappiderModalComponent } from '../modal';
import { RappiderAssetBrowserComponent } from '@rapider/angular-components/asset-browser';
import { RappiderIconComponent } from '../icon';
import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rappider-asset-picker',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    RappiderIconComponent,
    NzBreadCrumbModule,
    RappiderButtonComponent,
    TranslateModule,
    RappiderModalComponent,
    RappiderAssetBrowserComponent,
    NzToolTipModule
  ],
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderAssetPickerComponent),
      multi: true
    }
  ]
})
export class RappiderAssetPickerComponent implements OnInit {

  @Input() folderTree: NzTreeNodeOptions[];
  @Input() headerButtons: ButtonComponentConfig[];
  @Input() detailFooterButtons: ButtonComponentConfig[];
  /* base path for get file preview */
  @Input() basePath: string;
  /**
   * pass visibility function for handle visibility of header buttons
   * @default true
   *
   * @param buttonKey
   * @param selectedItem
   * @param buttonKey
   * @memberof RappiderAssetPickerComponent
   */
  @Input() headerButtonVisibilityFunction: (
    buttonKey: string,
    selectedItem: NzTreeNodeOptions,
    activeFolder: NzTreeNode
  ) => boolean = () => true;
  /**
   * pass visibility function for handle visibility of detail footer buttons
   * @default true
   *
   * @param buttonKey
   * @param selectedItem
   * @param buttonKey
   * @memberof RappiderAssetPickerComponent
   */
  @Input() detailFooterButtonVisibilityFunction: (
    buttonKey: string,
    selectedItem: NzTreeNodeOptions,
    activeFolder: NzTreeNode
  ) => boolean = () => true;

  /* emits when folder expand */
  @Output() folderExpand = new EventEmitter<NzFormatEmitEvent>();
  /* emits when folder select (same with activeFolderChange but this output emits select event with folder data) */
  @Output() folderSelect = new EventEmitter<NzFormatEmitEvent>();
  /* emits active folder when active folder change (same with folderSelect event but this event only emits folder) */
  @Output() activeFolderChange = new EventEmitter<NzTreeNode>();
  /* emits when selected item change */
  @Output() selectedItemChange = new EventEmitter<NzTreeNodeOptions>();
  /* emits when header buttons clicked */
  @Output() headerButtonClick = new EventEmitter<ButtonComponentConfig>();
  /* emits when detail footer buttons clicked */
  @Output() detailFooterButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() blur = new EventEmitter<string>();

  breadcrumbItems: NzTreeNode[] = [];
  selectedItem: NzTreeNodeOptions;
  activeFolder: NzTreeNode;
  clickCount = 0;
  folderPlaceholderIconPath = folderPlaceholderIconPath;
  imageFileTypes = imageFileTypes;
  previewModalButtonConfig: ButtonComponentConfig = {
    icon: {
      name: 'fa-regular fa-eye'
    }
  };
  removeSelectedAssetButtonConfig: ButtonComponentConfig = {
    icon: {
      name: 'fa-regular fa-trash'
    }
  };
  assetPickerModalVisibility = false;
  previewModalVisibility = false;

  /* file path */
  _value: string;

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.blur.emit(this.value);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.initDefaults();
  }

  initDefaults() {
    this.headerButtons = [
      ...(this.headerButtons || []),
      {
        key: 'close-modal',
        icon: {
          name: 'fa-regular fa-xmark'
        },
        size: ButtonSize.ExtraSmall
      },
    ];
    this.detailFooterButtons = [
      ...(this.detailFooterButtons || []),
      {
        key: 'select-item',
        text: 'Select',
        size: ButtonSize.Small,
        type: ButtonType.Primary
      },
    ];
  }

  handleAssetPickerModalVisibility(visibility: boolean) {
    this.assetPickerModalVisibility = visibility;
  }

  handlePreviewModalVisibility(visibility: boolean) {
    this.previewModalVisibility = visibility;
  }

  removeSelectedAsset() {
    this.value = null;
  }

  getModalButtonConfig(): ButtonComponentConfig {
    return this.value ? {
      text: 'Edit Asset',
      icon: {
        name: 'fa-solid fa-rotate'
      }
    } : {
      text: 'Select Asset',
      icon: {
        name: 'fa-solid fa-arrow-pointer'
      }
    };
  }

  onFolderExpand(event: NzFormatEmitEvent) {
    this.folderExpand.emit(event);
  }

  onFolderSelect(event: NzFormatEmitEvent) {
    this.folderSelect.emit(event);
  }

  onActiveFolderChange(event: NzTreeNode) {
    this.activeFolderChange.emit(event);
  }

  onSelectedItemChange(event: NzTreeNodeOptions) {
    this.selectedItem = event;
    this.selectedItemChange.emit(event);
  }

  onHeaderButtonClick(event: ButtonComponentConfig) {
    if (event.key === 'close-modal') {
      this.handleAssetPickerModalVisibility(false);
    }
    this.headerButtonClick.emit(event);
  }

  onDetailFooterButtonClick(event: ButtonComponentConfig) {
    if (event.key === 'select-item') {
      this.value = `${this.basePath}/project-files/get-file-content/` + this.selectedItem.id;
      this.handleAssetPickerModalVisibility(false);
    }
    this.detailFooterButtonClick.emit(event);
  }

}
