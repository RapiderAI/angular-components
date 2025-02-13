import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NzTreeComponent, NzTreeNodeOptions, NzTreeNode, NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';
import { folderPlaceholderIconPath, imageFileTypes } from '@rapider/angular-components/core/asset-browser';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RappiderIconComponent } from '@rapider/angular-components/icon';

@Component({
  selector: 'rappider-asset-browser',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    RappiderIconComponent,
    NzBreadCrumbModule,
    RappiderButtonComponent,
    TranslateModule
  ],
  templateUrl: './asset-browser.component.html',
  styleUrls: ['./asset-browser.component.scss']
})
export class RappiderAssetBrowserComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;

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
   * @memberof RappiderAssetBrowserComponent
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
   * @memberof RappiderAssetBrowserComponent
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

  breadcrumbItems: NzTreeNode[] = [];
  selectedItem: NzTreeNodeOptions;
  activeFolder: NzTreeNode;
  clickCount = 0;
  folderPlaceholderIconPath = folderPlaceholderIconPath;
  imageFileTypes = imageFileTypes;

  ngAfterViewInit(): void {
    /* we want folder tree type as NzTreeNodeOptions, NzTreeNodeOptions[] converted NzTreeNode[] in nz-tree component
     * when folder tree change we need to find root folder node in tree  with nz-tree component's fn (ViewChild).
     * wait 1ms for pass input to component
     */
    setTimeout(() => this.selectRootFolderDefault(), 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDefaults();
    /* we want folder tree type as NzTreeNodeOptions, NzTreeNodeOptions[] converted NzTreeNode[] in nz-tree component
     * when folder tree change we need to find root folder node in tree  with nz-tree component's fn (ViewChild).
     * wait 1ms for pass input to component
     */
    if (changes['folderTree']) {
      setTimeout(() => this.selectRootFolderDefault(), 1);
    }
  }

  ngOnInit(): void {
    this.setDefaults();
  }

  setDefaults() {
    if (this.headerButtonVisibilityFunction == null) {
      this.headerButtonVisibilityFunction = () => true;
    }
    if (this.detailFooterButtonVisibilityFunction == null) {
      this.detailFooterButtonVisibilityFunction = () => true;
    }
  }

  selectRootFolderDefault() {
    if (this.folderTree?.length && this.nzTreeComponent) {
      const rootFolderNode = this.nzTreeComponent.getTreeNodeByKey(this.folderTree[0]['id']);
      const selectEvent: NzFormatEmitEvent = {
        eventName: 'click',
        node: rootFolderNode,
        keys: [rootFolderNode.key]
      };
      this.onFolderSelect(selectEvent);
    }
  }

  updateBreadcrumbRecursively(lastSelectedFolder: NzTreeNode) {
    this.breadcrumbItems = [
      lastSelectedFolder,
      ...this.breadcrumbItems
    ];
    if (!lastSelectedFolder['origin']['isRoot']) {
      this.updateBreadcrumbRecursively(lastSelectedFolder.parentNode);
    }
  }

  // #region Events

  onFolderSelect(event: NzFormatEmitEvent): void {
    if (event.eventName === 'click') {
      const node = event.node;
      this.breadcrumbItems = [];
      this.updateBreadcrumbRecursively(node);

      if (event.keys.includes(node.key)) {
        // set node as selected for tree
        node.isSelected = true;
        // trigger expand event manually for expand selected folder
        node.setExpanded(true);
        const expandEvent: NzFormatEmitEvent = {
          eventName: 'expand',
          node: node
        };
        this.onFolderExpand(expandEvent);
        // assign node as active folder
        this.activeFolder = node;
        // emit folder
        this.activeFolderChange.emit(this.activeFolder);
        // emit folder select event
        this.folderSelect.emit(event);
        // set selected item as null when active folder change
        this.selectedItem = null;
        this.selectedItemChange.emit(this.selectedItem);
      }
    }
  }

  onFolderExpand(event: NzFormatEmitEvent): void {
    const node = event.node;
    if (event.eventName === 'expand') {
      this.folderExpand.emit(event);
    }
  }

  navigateToFolder(folder: NzTreeNode) {
    const folderSelectEvent: NzFormatEmitEvent = {
      eventName: 'click',
      node: folder,
      keys: [folder.key]
    };
    this.onFolderSelect(folderSelectEvent);
  }

  onContentSelect(event: Event, selectedItem: NzTreeNodeOptions) {
    event.stopPropagation();
    // for detect single or dbl click
    // double click mean navigate to folder, single click mean select item
    this.clickCount++;
    setTimeout(() => {
      if (this.clickCount === 1) {
        this.selectedItem = selectedItem;
        this.selectedItemChange.emit(this.selectedItem);
      } else if (this.clickCount === 2) {
        if (!selectedItem?.isLeaf) {
          const selectedItemNode = this.nzTreeComponent.getTreeNodeByKey(selectedItem.key);
          this.navigateToFolder(selectedItemNode);
        }
      }
      this.clickCount = 0;
    }, 250);
  }

  onContentSelectCancel(event: Event) {
    event.stopPropagation();
    this.selectedItem = null;
    this.selectedItemChange.emit(this.selectedItem);
  }

  onHeaderButtonClick(button: ButtonComponentConfig) {
    this.headerButtonClick.emit(button);
  }

  onDetailFooterButtonClick(button: ButtonComponentConfig) {
    this.detailFooterButtonClick.emit(button);
    /* set selected item as null when detail footer button click */
    this.selectedItem = null;
    this.selectedItemChange.emit(this.selectedItem);
  }

  // #endregion Events

}
