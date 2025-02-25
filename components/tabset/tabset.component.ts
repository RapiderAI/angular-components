import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsetComponentConfig } from './utils/tabset-component-config.interface';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabsetPosition, TabsetSize, TabsetType } from '@rapider/angular-components/core/tabset';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderButtonComponent } from '@rapider/angular-components/button';

@Component({
  selector: 'rappider-tabset',
  standalone: true,
  imports: [RappiderIconComponent, RappiderButtonComponent, NzTabsModule, CommonModule],
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class RappiderTabsetComponent {
  @Input() tabs: TabsetComponentConfig[];
  @Input() selectedIndex: number;
  @Input() tabsetSize: TabsetSize;
  @Input() tabsetPosition = TabsetPosition.Top;
  @Input() tabsetType: TabsetType;
  @Input() tabsetBarGutter = 0;
  @Input() hideAll: boolean;
  @Input() center: boolean;
  @Input() extraContent: ButtonComponentConfig;

  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() selectChange = new EventEmitter<{ index: number; tab: TabsetComponentConfig }>();
  @Output() extraContentConfirm = new EventEmitter();

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push({ title: 'New Tab', content: 'New Content' });
    this.selectedIndex = this.tabs.length;
  }

  onExtraContentConfirm() {
    this.extraContentConfirm.emit();
  }

  onSelectedIndexChange(value: number) {
    this.selectedIndexChange.emit(value);
  }

  onSelectChange(index: number, tab: TabsetComponentConfig) {
    this.selectChange.emit({ index: index, tab: tab });
  }

}