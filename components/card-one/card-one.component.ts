import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ImageComponentConfig, RappiderImageComponent } from '@rapider/angular-components/image';
import { RappiderAvatarComponent, AvatarComponentConfig } from '@rapider/angular-components/avatar';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { IconType } from '@rapider/angular-components/core/icon';
import { RappiderDividerComponent, DividerComponentConfig } from '@rapider/angular-components/divider';
import { RappiderHeadingComponent, HeadingComponentConfig } from '@rapider/angular-components/heading';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';
import { RappiderParagraphComponent, ParagraphComponentConfig } from '@rapider/angular-components/paragraph';
import { RappiderRateDisplayComponent } from '@rapider/angular-components/rate-display';
import { RappiderTagComponent, TagComponentConfig } from '@rapider/angular-components/tag';
import { AvatarPlacement, CardDisplayMode, CardOneButtonOutput, CardOneImagePosition } from '@rapider/angular-components/core/card-one';



@Component({
  selector: 'rappider-card-one',
  standalone: true,
  imports: [
    CommonModule,
    NzPopoverModule,
    RappiderImageComponent,
    RappiderTagComponent,
    RappiderRateDisplayComponent,
    RappiderHeadingComponent,
    RappiderButtonComponent,
    RappiderParagraphComponent,
    RappiderAvatarComponent,
    RappiderDividerComponent,
    RappiderIconComponent
],
  templateUrl: './card-one.component.html',
  styleUrls: ['./card-one.component.scss']
})
export class RappiderCardOneComponent implements OnInit, OnChanges {

  /* data to emit */
  @Input() data: any;
  @Input() imagePosition: CardOneImagePosition;
  @Input() image: ImageComponentConfig;
  @Input() imageTags: TagComponentConfig[];
  @Input() imageButtons: ButtonComponentConfig[];
  @Input() imageButtonPlacement: 'horizontal' | 'vertical';
  @Input() rate: number;
  @Input() titles: HeadingComponentConfig[];
  @Input() currency: string;
  @Input() finalPrice: number;
  @Input() price: number;
  @Input() additionalTags: TagComponentConfig[];
  @Input() additionalButtons: ButtonComponentConfig[];
  @Input() descriptions: ParagraphComponentConfig[];
  @Input() avatar: AvatarComponentConfig;
  @Input() avatarButton: ButtonComponentConfig;
  @Input() avatarPlacement: AvatarPlacement;
  @Input() isSelected: boolean;
  @Input() selectedCardIcon: IconComponentConfig;
  @Input() divider: DividerComponentConfig;
  @Input() showTitleOnImage: boolean;
  @Input() showDescriptionOnImage: boolean;
  @Input() showPopover: boolean;
  @Input() showPopoverImage: ImageComponentConfig;
  @Input() displayMode: CardDisplayMode;

  @Output() cardClick = new EventEmitter();
  @Output() imageButtonClick = new EventEmitter<CardOneButtonOutput>();
  @Output() additionalButtonClick = new EventEmitter<CardOneButtonOutput>();

  AvatarPlacement = AvatarPlacement;

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (!this.selectedCardIcon) {
      this.selectedCardIcon = {
        name: 'fa-solid fa-circle-check',
        type: IconType.FontAwesome,
        color: 'var(--success-color)'
      };
    }
    if (this.avatarPlacement == null) {
      this.avatarPlacement = AvatarPlacement.Top;
    }
    if (this.isSelected == null) {
      this.isSelected = false;
    }
  }

  onCardClick() {
    this.cardClick.emit({ data: this.data });
  }

  onImageButtonClick(button: ButtonComponentConfig, event) {
    event.stopPropagation();
    this.imageButtonClick.emit({ button: button, data: this.data });
  }

  onAdditionalButtonClick(button: ButtonComponentConfig, event) {
    event.stopPropagation();
    if (button.behavior ) {
      window.open(button.redirectUrl, button.redirectMode);
    } else {
      this.additionalButtonClick.emit({ button: button, data: this.data });
    }
  }

  setImagePositionClass(): string {
    switch (this.imagePosition) {
      case CardOneImagePosition.Top:
        return 'image-position-top';
      case CardOneImagePosition.Right:
        return 'image-position-right';
      case CardOneImagePosition.Left:
        return 'image-position-left';
      case CardOneImagePosition.Bottom:
        return 'image-position-bottom';
      default:
        return '';
    }
  }

  setCardDisplayModeClass(): string {
    switch (this.displayMode) {
      case CardDisplayMode.Flex:
        return 'card-description-wrapper-flex';
      case CardDisplayMode.Block:
        return 'card-description-wrapper-block';
      default:
        return '';
    }
  }
}
