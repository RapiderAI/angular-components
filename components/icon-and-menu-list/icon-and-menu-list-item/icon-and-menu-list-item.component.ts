import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownMenuComponentConfig, RappiderDropdownMenuComponent } from '@rapider/angular-components/dropdown-menu';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';


@Component({
  selector: 'rappider-icon-and-menu-list-item',
  standalone: true,
  imports: [
    CommonModule,
    RappiderIconComponent,
    RappiderDropdownMenuComponent,
    RappiderHeadingComponent,
    RappiderTextComponent,
  ],
  templateUrl: './icon-and-menu-list-item.component.html',
  styleUrls: ['./icon-and-menu-list-item.component.scss'],
})
export class RappiderIconAndMenuListItemComponent {

  /**
   * menu item title
   *
   * @type {string}
   * @memberof IconAndMenuListItemComponent
   */
  @Input() title: HeadingComponentConfig;
  /**
   *menu item description
   *
   * @type {string}
   * @memberof IconAndMenuListItemComponent
   */
  @Input() description: TextComponentConfig;
  /**
   * menu item icon
   *
   * @type {string}
   * @memberof IconAndMenuListItemComponent
   */
  @Input() icon: IconComponentConfig;
  @Input() dropdownMenu: DropdownMenuComponentConfig;

}
