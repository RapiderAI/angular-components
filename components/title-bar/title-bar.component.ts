import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { BreadcrumbOption } from '@rapider/angular-components/core/breadcrumb';
import { DropdownMenuItem } from '@rapider/angular-components/core/dropdown-menu';
import { RappiderBreadcrumbComponent } from '@rapider/angular-components/breadcrumb';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderDropdownMenuComponent, DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { RappiderHeadingComponent, HeadingComponentConfig } from '@rapider/angular-components/heading';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';
import { RappiderRadioComponent } from '@rapider/angular-components/radio';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderSwitchComponent, SwitchComponentConfig } from '@rapider/angular-components/switch';
import { TitleBarActionButtonConfig } from '@rapider/angular-components/core/title-bar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'rappider-title-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzToolTipModule,
    RappiderBreadcrumbComponent,
    RappiderDropdownMenuComponent,
    RappiderIconComponent,
    RappiderHeadingComponent,
    RappiderTextComponent,
    RappiderButtonComponent,
    RappiderSwitchComponent,
    RappiderRadioComponent
  ],
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class RappiderTitleBarComponent implements OnInit {

  @Input() mainTitle: HeadingComponentConfig;
  @Input() options: BreadcrumbOption[];
  @Input() cssStyle: any;
  @Input() dropdownMenu: DropdownMenuComponentConfig;
  @Input() actionIcon: IconComponentConfig;
  @Input() actionButtons: TitleBarActionButtonConfig[];
  @Input() displayBreadcrumb = true;
  @Input() switchSettings: SwitchComponentConfig;
  @Input() radioButtonSettings: SelectableOption[];

  @Output() optionClick = new EventEmitter<BreadcrumbOption>();
  @Output() menuItemClick = new EventEmitter<DropdownMenuItem>();
  @Output() actionIconClick = new EventEmitter();
  @Output() actionButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() radioButtonClick = new EventEmitter<string>();
  @Output() switchToggled = new EventEmitter<boolean>();

  switchChecked: boolean;

  ngOnInit() {
    if (this.switchSettings?.defaultValue) {
      this.switchChecked = !!this.switchSettings?.defaultValue;
    }
  }

  onSwitchValueChanged(event) {
    this.switchChecked = !!event;
    this.switchToggled.emit(this.switchChecked);
  }


  onOptionClick(option: BreadcrumbOption) {
    this.optionClick.emit(option);
  }

  onMenuItemClick(menu: DropdownMenuItem) {
    this.menuItemClick.emit(menu);
  }

  onActionIconClick() {
    this.actionIconClick.emit();
  }

  onClickActionButton(button: ButtonComponentConfig) {
    this.actionButtonClick.emit(button);
  }

  onRadioButtonValueChange(radioValue) {
    this.radioButtonClick.emit(radioValue);
    console.log(event);
  }

}
