import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OverFlowCollapseFrom } from '@rapider/angular-components/core/overflow-list';
import { DropdownMenuItem } from '@rapider/angular-components/core/dropdown-menu';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { IconType } from '@rapider/angular-components/core/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RappiderDropdownMenuComponent } from '@rapider/angular-components/dropdown-menu';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';

@Component({
  selector: 'rappider-overflow-list',
  templateUrl: './overflow-list.component.html',
  imports:[
    CommonModule,
    FormsModule,
    RappiderDropdownMenuComponent,
    RappiderTextboxComponent
  ],
  standalone: true,
  styleUrls: ['./overflow-list.component.scss']
})
export class RappiderOverflowListComponent implements OnInit, OnChanges {

  @Input() items: string[];
  @Input() minVisibleItems: number;
  @Input() collapseFrom: OverFlowCollapseFrom;
  @Input() showIcons: boolean;
  @Input() renderCurrentBreadcrumbAsInput: boolean;

  @Output() itemClick = new EventEmitter<string>();
  @Output() inputValueChange = new EventEmitter<string>();

  visibleItems: string[] = [];
  overflowItems: string[] = [];
  currentInputValue: string;
  OverFlowCollapseFrom = OverFlowCollapseFrom;

  ellipsisIcon: IconComponentConfig = {
    name: 'fa-solid fa-ellipsis',
    type: IconType.FontAwesome,
    size: '16px'
  };

  ngOnInit() {
    this.initializeItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] || changes['minVisibleItems'] || changes['collapseFrom']) {
      this.initializeItems();
    }
  }

  initializeItems() {
    if (this.items) {
      const minVisible = this.minVisibleItems || 0;
      const collapseFrom = this.collapseFrom || OverFlowCollapseFrom.End;

      if (collapseFrom === OverFlowCollapseFrom.End) {
        this.renderCurrentBreadcrumbAsInput = false;
      }

      if (collapseFrom === OverFlowCollapseFrom.End) {
        this.visibleItems = this.items.slice(0, minVisible);
        this.overflowItems = this.items.slice(minVisible);
        this.currentInputValue = null;
      } else {
        this.visibleItems = this.items.slice(-minVisible);
        this.overflowItems = this.items.slice(0, -minVisible);
        if (this.renderCurrentBreadcrumbAsInput) {
          this.currentInputValue = this.visibleItems[this.visibleItems.length - 1];
        }
      }
    }
  }

  getDropdownItems(): DropdownMenuItem[] {
    return this.overflowItems.map(item => ({
      key: item,
      label: item,
      icon: this.showIcons ? {
        name: this.isFolder(item) ? 'fa-folder' : 'fa-file',
        type: IconType.FontAwesome
      } : undefined
    }));
  }

  isFolder(item: string): boolean {
    return !item.includes('.');
  }

  onItemClick(item: string) {
    this.itemClick.emit(item);
  }

  onOverflowItemClick(menuItem: any) {
    this.itemClick.emit(menuItem.key);
  }

  onInputChange(value: string) {
    this.inputValueChange.emit(value);
  }
}
