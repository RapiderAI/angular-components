import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderAccordionComponent } from '../accordion/accordion.component';
import { RappiderButtonComponent } from '../button/button.component';
import { RappiderHeadingComponent } from '../heading/heading.component';
import { RappiderImageComponent } from '../image/image.component';
import { RappiderParagraphComponent } from '../paragraph/paragraph.component';
import { CartItemAdditionalContent } from '../core/cart-item/cart-item-additional-content.interface';
import { ButtonComponentConfig } from '../button';
import { CartItem } from '../core/cart-item';
import { HeadingComponentConfig } from '../heading';
import { ImageComponentConfig } from '../image';
import { TypographyConfig } from '../core/typography/typography-config.interface';
//import { RappiderIconBlockComponent } from '../icon-block/icon-block.component';
//import { RappiderDividerComponent } from '../divider/divider.component';


@Component({
  selector: 'rappider-cart-item',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    RappiderImageComponent,
    RappiderHeadingComponent,
    RappiderParagraphComponent,
    RappiderButtonComponent,
    RappiderAccordionComponent,
    // RappiderIconBlockComponent,
    // RappiderDividerComponent
  ],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class RappiderCartItemComponent {
  @Input() image: ImageComponentConfig;
  //@Input() divider: DividerComponentConfig;
  @Input() item: CartItem;
  @Input() additionalItems: CartItemAdditionalContent[];
  @Input() additionalItemsTitle: HeadingComponentConfig;
  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() typographySettings: TypographyConfig;
  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();

  onButtonClick(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }
}
