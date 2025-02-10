import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponentConfig, RappiderDividerComponent } from '@rapider/angular-components/divider';
import { ImageComponentConfig, RappiderImageComponent } from '@rapider/angular-components/image';
import { IconAndMenuListComponentConfig, RappiderIconAndMenuListComponent } from '@rapider/angular-components/icon-and-menu-list';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { IconBlockComponentConfig, RappiderIconBlockComponent } from '@rapider/angular-components/icon-block';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderTagComponent } from '@rapider/angular-components/tag';
import { Tag } from '@rapider/angular-components/core/tag';

@Component({
  selector: 'rappider-profile-card',
  templateUrl: './profile-card.component.html',
  imports:[
    CommonModule,
    RappiderTagComponent,
    RappiderIconComponent,
    RappiderIconBlockComponent,
    RappiderHeadingComponent,
    NzCardComponent,
    RappiderButtonComponent,
    RappiderTextComponent,
    RappiderIconAndMenuListComponent,
    RappiderImageComponent,
    RappiderDividerComponent
  ],
  standalone: true,
  styleUrls: ['./profile-card.component.scss']
})
export class RappiderProfileCardComponent {
  /**
   *Displays the tag of the card
   *
   * @type {Tag}
   * @memberof RappiderProfileCardComponent
   */
  @Input() profileTag: Tag;
  /**
   *Displays the icon of the card
   *
   * @type {ButtonComponentConfig}
   * @memberof RappiderProfileCardComponent
   */
  @Input() iconButton: ButtonComponentConfig;
  /**
   *Displays the avatar of the card
   *
   * @type {IconBlockComponentConfig}
   * @memberof RappiderProfileCardComponent
   */
  @Input() profilePicture: IconBlockComponentConfig;
  /**
   *Displays the title of the card
   *
   * @type {HeadingComponentConfig}
   * @memberof RappiderProfileCardComponent
   */
  @Input() profileTitle: HeadingComponentConfig;
  /**
   *Displays the additional information of the title
   *
   * @type {string}
   * @memberof RappiderProfileCardComponent
   */
  @Input() additionalContent: TextComponentConfig;
  /**
   *Displays the multiple tags of the card
   *
   * @type {Tag[]}
   * @memberof RappiderProfileCardComponent
   */
  @Input() tags: Tag[];
  /**
   *Displays information with icons
   *
   * @type {IconAndMenuListComponentConfig}
   * @memberof RappiderProfileCardComponent
   */
  @Input() icons: IconAndMenuListComponentConfig;
  /**
   *Displays the images of the card
   *
   * @type {ImageComponentConfig[]}
   * @memberof RappiderProfileCardComponent
   */
  @Input() images: ImageComponentConfig[];
  /**
   *Sets divider between images
   *
   * @type {string}
   * @memberof RappiderProfileCardComponent
   */
  @Input() divider: string;
  @Input() dividerComponentConfig: DividerComponentConfig;
  /**
   *Button click emit
   *
   * @memberof RappiderProfileCardComponent
   */
  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();

  onButtonClick(iconButton: ButtonComponentConfig) {
    this.buttonClick.emit(iconButton);
  }

}

