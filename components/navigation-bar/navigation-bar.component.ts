import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationBarDropdownMenuWrapper, NavigationBarButtonWrapper, NavigationBarResponsiveMenuMode } from '@rapider/angular-components/core/navigation-bar';
import { DropdownMenuItem } from '@rapider/angular-components/core/dropdown-menu';
import { MenuMode, Menu } from '@rapider/angular-components/core/menu';
import { RappiderCartPreviewComponent, CartPreviewComponentConfig } from '@rapider/angular-components/cart-preview';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderDrawerComponent, DrawerComponentConfig } from '@rapider/angular-components/drawer';
import { RappiderDropdownMenuComponent } from '@rapider/angular-components/dropdown-menu';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';
import { RappiderImageComponent, ImageComponentConfig } from '@rapider/angular-components/image';
import { RappiderMenuComponent, MenuComponentConfig } from '@rapider/angular-components/menu';
import { RappiderInputGroupComponent, InputGroupComponentConfig } from '@rapider/angular-components/input-group';
import { NzInputModule } from 'ng-zorro-antd/input';


@Component({
  selector: 'rappider-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzInputModule,
    RappiderIconComponent,
    RappiderButtonComponent,
    RappiderDropdownMenuComponent,
    RappiderMenuComponent,
    RappiderImageComponent,
    RappiderInputGroupComponent,
    RappiderCartPreviewComponent,
    RappiderDrawerComponent
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class RappiderNavigationBarComponent implements OnInit, OnChanges {

  /**
   * Menu config of the navigation bar
   *
   * @type {IMenuComponent}
   * @memberof NavigationBarComponent
   */
  @Input() menu: MenuComponentConfig;
  /**
   *  Menu visibility
   *
   * @type {boolean}
   * @memberof RappiderNavigationBarComponent
   */
  @Input() isMenuVisible: boolean;
  /**
   * Brand text or logo router
   *
   * @type {string}
   * @memberof NavigationBarComponent
   */
  @Input() brandRouteUrl: string;
  /**
   * Brand text for logo
   *
   * @type {string}
   * @memberof NavigationBarComponent
   */
  @Input() brandText: string;
  /**
   * Brand image for logo
   *
   * @type {Image}
   * @memberof NavigationBarComponent
   */
  @Input() brandImage: ImageComponentConfig;
  /**
   * Brand visibility
   *
   * @type {boolean}
   * @memberof RappiderNavigationBarComponent
   */
  @Input() isBrandVisible: boolean;
  /**
   * Additional buttons for navigation bar
   *
   * @type {NavigationBarButtonWrapper[]}
   * @memberof NavigationBarComponent
   */
  @Input() buttons: NavigationBarButtonWrapper[];
  /**
   * Additional dropdowns for navigation bar
   *
   * @type {NavigationBarDropdownMenuWrapper[]}
   * @memberof NavigationBarComponent
   */
  @Input() dropdowns: NavigationBarDropdownMenuWrapper[];
  /**
   * Toggler icon for collapsed navigation bar
   *
   * @type {Icon}
   * @memberof NavigationBarComponent
   */
  @Input() togglerIcon: IconComponentConfig;
  /**
   * Search bar configs
   *
   * @type {InputGroup}
   * @memberof NavigationBarComponent
   */
  @Input() searchArea: InputGroupComponentConfig;
  /**
 * Search area visibility
 *
 * @type {boolean}
 * @memberof NavigationBarComponent
 */
  @Input() isSearchable: boolean;
  /**
   * Cart config
   *
   * @type {CartPreviewComponentConfig}
   * @memberof RappiderNavigationBarComponent
   */
  @Input() cart: CartPreviewComponentConfig;
  /**
   * Cart visiblity state
   *
   * @type {boolean}
   * @memberof RappiderNavigationBarComponent
   */
  @Input() isCartVisible: boolean;
  @Input() drawer: DrawerComponentConfig;
  @Input() responsiveMenuMode: NavigationBarResponsiveMenuMode;

  @Output() togglerClick = new EventEmitter();
  @Output() menuItemClick = new EventEmitter<Menu>();
  @Output() dropdownMenuItemClick = new EventEmitter<DropdownMenuItem>();
  @Output() additionalButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() searchValueChange = new EventEmitter<string>();
  @Output() searchButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() cartDropdownButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() cartButtonClick = new EventEmitter<ButtonComponentConfig>();
  @Output() cartItemButtonClick = new EventEmitter<ButtonComponentConfig>();

  responsiveDropdownMenuVisible = false;
  ResponsiveMenuMode = NavigationBarResponsiveMenuMode;

  ngOnInit(): void {
    this.initDefault();
    this.subscribeToWindowInnerWith();
  }

  ngOnChanges() {
    this.initDefault();
  }

  initDefault() {
    if (this.isSearchable == null) {
      this.isSearchable = false;
    }
    if (this.isBrandVisible == null) {
      this.isBrandVisible = false;
    }
    if (this.isMenuVisible == null) {
      this.isMenuVisible = false;
    }
    if (this.isCartVisible == null) {
      this.isCartVisible = false;
    }
    if (!this.togglerIcon) {
      this.togglerIcon = {
        name: 'far fa-bars'
      };
    }
    if (this.responsiveMenuMode == null) {
      this.responsiveMenuMode = this.ResponsiveMenuMode.Drawer;
    }
  }

  subscribeToWindowInnerWith() {
    this.updateMenuModeAndResponsiveMenuVisibilities();
    window.addEventListener('resize', () => {
      this.updateMenuModeAndResponsiveMenuVisibilities();
    });
  }

  /**
   * change menu mode by window inner width
   * if innerWidth greater than 992px
   * set drawer & responsive dropdown menu visibilities to false
   *
   * @memberof RappiderNavigationBarComponent
   */
  updateMenuModeAndResponsiveMenuVisibilities() {
    const width = window.innerWidth;
    if (width > 992) {
      this.menu.config.mode = MenuMode.Horizontal;
      this.responsiveDropdownMenuVisible = false;
      this.drawer.visible = false;
    } else {
      this.menu.config.mode = MenuMode.Inline;
    }
    // trigger change detection
    this.menu.config = { ...this.menu.config };
  }

  onClickToggler() {
    this.togglerClick.emit();
    if (this.responsiveMenuMode === this.ResponsiveMenuMode.Drawer) {
      this.drawer.visible = true;
    } else if (this.responsiveMenuMode === this.ResponsiveMenuMode.Dropdown) {
      this.responsiveDropdownMenuVisible = !this.responsiveDropdownMenuVisible;
    }
  }

  onDrawerClose() {
    this.drawer.visible = false;
  }

  onMenuItemClick(menu: Menu) {
    this.menuItemClick.emit(menu);
  }

  onAdditionalButtonClick(button: ButtonComponentConfig) {
    this.additionalButtonClick.emit(button);
  }

  onDropdownMenuItemClick(item: DropdownMenuItem) {
    this.dropdownMenuItemClick.emit(item);
  }

  onSearchValueChange(value: string) {
    this.searchValueChange.emit(value);
  }

  onSearchButtonClick(button: ButtonComponentConfig) {
    this.searchButtonClick.emit(button);
  }

  onCartDropdownButtonClick(button: ButtonComponentConfig) {
    this.cartDropdownButtonClick.emit(button);
  }

  onCartButtonClick(button: ButtonComponentConfig) {
    this.cartButtonClick.emit(button);
  }

  onCartItemButtonClick(button: ButtonComponentConfig) {
    this.cartItemButtonClick.emit(button);
  }

}
