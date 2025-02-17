import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BreadcrumbOption } from '@rapider/angular-components/core/breadcrumb';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { DropdownMenuItem } from '@rapider/angular-components/core/dropdown-menu';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { SwitchComponentConfig } from '@rapider/angular-components/switch';
import { CommonModule } from '@angular/common';
import { RappiderTitleBarComponent } from '@rapider/angular-components/title-bar';
import { RappiderToolbarComponent } from '@rapider/angular-components/toolbar';

@Component({
  selector: 'rappider-title-toolbar',
  templateUrl: './title-toolbar.component.html',
  imports:[
    CommonModule,
    RappiderTitleBarComponent,
    RappiderToolbarComponent
  ],
  standalone: true,
  styleUrls: ['./title-toolbar.component.scss']
})
export class RappiderTitleToolbarComponent implements OnChanges {

  @Input() mainTitle: HeadingComponentConfig;
  /* flag to display or hide the toolbar */
  @Input() displayToolbar = false;
  /* explicit option to pass to the toolbar in order to set the visiblity of back button */
  @Input() displayToolbarBackButton = false;
  /* flag to display breadcrumb under title */
  @Input() displayBreadcrumb = true;
  @Input() options: BreadcrumbOption[] | string[] | string;
  @Input() titleBarActionButtons?: any[];
  @Input() titleBarActionMenu?: DropdownMenuComponentConfig;
  @Input() titleBarSwitchSettings: SwitchComponentConfig;
  @Input() titleBarRadioButtonSettings: SelectableOption[];

  @Output() titleBarActionButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() titleBarRadioButtonClick = new EventEmitter<string>();
  @Output() switchToggled = new EventEmitter<boolean>();
  @Output() titleBarActionMenuClick = new EventEmitter<DropdownMenuItem>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.mapTitleBreadcrumbOptionsToLabel(changes['options']?.currentValue);
  }

  mapTitleBreadcrumbOptionsToLabel(value: any) {
    if (value && typeof value[0] === 'string') {
      try {
        this.options = value.map(item => ({
          label: item
        }));
      } catch (error) {
        this.options = [{ label: value }];
      }
    }
  }

  onTitleBarActionButtonClick(button: ButtonComponentConfig) {
    this.titleBarActionButtonClick.emit(button);
  }

  onSwitchToggled(switchValue: boolean) {
    this.switchToggled.emit(switchValue);
  }

  onTitleBarRadioButtonClick(selectedValue: string) {
    this.titleBarRadioButtonClick.emit(selectedValue);
  }

  onTitleBarActionMenuClick(menuItem: DropdownMenuItem) {
    this.titleBarActionMenuClick.emit(menuItem);
  }

}
