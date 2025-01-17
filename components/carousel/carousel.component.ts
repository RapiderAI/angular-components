import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselEffect } from '../core/carousel/public-api';

@Component({
  selector: 'rappider-carousel',
  standalone: true,
  imports: [
    CommonModule,
    NzCarouselModule,
    RappiderTextComponent
  ],
  templateUrl: './carousel.component.html',
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