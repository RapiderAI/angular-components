import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponentConfig } from '@rapider/angular-components/cart-item';
import { DropdownMenuTriggerType, DropdownMenuPlacement } from '@rapider/angular-components/core/dropdown-menu';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderCartItemComponent } from '@rapider/angular-components/cart-item';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'rappider-cart-preview',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    RappiderCartItemComponent,
    RappiderTextComponent,
    RappiderButtonComponent,
  ],
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class RappiderCartPreviewComponent {
  /**
   *Cart's items
   *
   * @type {CartItemComponentConfig[]}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() cartItem: CartItemComponentConfig[];
  /**
   *Cart's footer
   *
   * @type {string}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() footer: TextComponentConfig;
  /**
   *Footer content
   *
   * @type {string}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() footerContent: TextComponentConfig;
  /**
   *Cart's buttons
   *
   * @type {ButtonComponentConfig[]}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() buttons: ButtonComponentConfig[];
  /**
   *Dropdown's button
   *
   * @type {ButtonComponentConfig}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() dropdownButton: ButtonComponentConfig;
  /**
   *Placement of dropdown
   *
   * @type {DropdownMenuPlacement}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() placement: DropdownMenuPlacement;
  /**
   *Trigger type of dropdown
   *
   * @type {DropdownMenuTriggerType}
   * @memberof RappiderCartPreviewComponent
   */
  @Input() triggerType: DropdownMenuTriggerType;

  /**
   *Dropdown click emit
   *
   * @memberof RappiderCartPreviewComponent
   */
  @Output() dropdownButtonClick = new EventEmitter<ButtonComponentConfig>();
  /**
   *Button click emit
   *
   * @memberof RappiderCartPreviewComponent
   */
  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();
  /**
   *Cart items click emit
   *
   * @memberof RappiderCartPreviewComponent
   */
  @Output() cartItemButtonClick = new EventEmitter<ButtonComponentConfig>();

  onDropdownButtonClick(dropdownButton: ButtonComponentConfig) {
    this.buttonClick.emit(dropdownButton);
  }

  onCartItemButtonClick(cartItem: ButtonComponentConfig) {
    this.buttonClick.emit(cartItem);
  }

  onButtonClick(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }

}
