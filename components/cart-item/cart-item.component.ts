import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderAccordionComponent } from '@rapider/angular-components/accordion';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { ImageComponentConfig, RappiderImageComponent } from'@rapider/angular-components/image';
import { RappiderParagraphComponent } from '@rapider/angular-components/paragraph';
import { CartItemAdditionalContent } from '@rapider/angular-components/core/cart-item'; 
import { CartItem } from '@rapider/angular-components/core/cart-item';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { RappiderIconBlockComponent } from '@rapider/angular-components/icon-block/icon-block.component';
import { RappiderDividerComponent } from '@rapider/angular-components/divider/divider.component';
import { DividerComponentConfig } from '@rapider/angular-components/core/divider';


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
    RappiderIconBlockComponent,
    RappiderDividerComponent
  ],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class RappiderCartItemComponent {
  @Input() image: ImageComponentConfig;
  @Input() divider: DividerComponentConfig;
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
