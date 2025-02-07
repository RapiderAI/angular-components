import { Component, Input, TemplateRef } from '@angular/core';
import { CarouselEffect } from '@rapider/angular-components/core/carousel';
import { CommonModule } from '@angular/common';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { RappiderTextComponent } from '../text';

@Component({
  selector: 'rappider-carousel',
  templateUrl: './carousel.component.html',
  imports:[
    CommonModule,
    NzCarouselComponent,
    RappiderTextComponent
  ],
  standalone: true,
  styleUrls: ['./carousel.component.scss'],
})
export class RappiderCarouselComponent {
  /**
   *Whether to scroll automatically
   *
   * @type {boolean}
   * @memberof RappiderCarouselComponent
   */
  @Input() autoplay: boolean;
  /**
   *Duration (milliseconds), does not scroll when set to 0
   *
   * @type {number}
   * @memberof RappiderCarouselComponent
   */
  @Input() autoplaySpeed: number;
  /**
   *The position of the dots, which can be one of topbottomleftright
   *
   * @type {string}
   * @memberof RappiderCarouselComponent
   */
  @Input() dotPosition: string;
  /**
   *Whether to show the dots at the bottom of the gallery
   *
   * @type {boolean}
   * @memberof RappiderCarouselComponent
   */
  @Input() dots: boolean;
  /**
   *Transition effect
   *
   * @type {CarouselEffect}
   * @memberof RappiderCarouselComponent
   */
  @Input() effect: CarouselEffect;
  /**
   *Whether to support swipe gesture
   *
   * @type {boolean}
   * @memberof RappiderCarouselComponent
   */
  @Input() enableSwipe: boolean;
  /**
   *Carousel's content
   *
   * @type {{ carouselTemplate: TemplateRef<string> }[]}
   * @memberof RappiderCarouselComponent
   */
  @Input() contents: { carouselTemplate: TemplateRef<string> }[];

  @Input() isContentVisible: boolean;

  CarouselEffect = CarouselEffect;
}
