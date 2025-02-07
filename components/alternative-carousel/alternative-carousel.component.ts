import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CardOneComponentConfig, RappiderCardOneComponent } from '@rapider/angular-components/card-one';
import { CardOneButtonOutput } from '@rapider/angular-components/core/card-one';
import { CarouselBreakpoint } from '@rapider/angular-components/core/alternative-carousel';
import { CarouselAutoplayOptions, CarouselPaginationOptions } from '@rapider/angular-components/core/alternative-carousel';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'rappider-alternative-carousel',
  templateUrl: './alternative-carousel.component.html',
  styleUrls: ['./alternative-carousel.component.scss'],
  imports: [
    CommonModule,
    RappiderCardOneComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class RappiderAlternativeCarouselComponent implements OnInit, OnChanges {
  @Input() cardItems: CardOneComponentConfig[];
  @Input() slidesPerView: number;
  @Input() spaceBetween: number;
  @Input() navigation: boolean;
  @Input() pagination: CarouselPaginationOptions;
  @Input() loop: boolean;
  @Input() mousewheel: boolean;
  @Input() autoplay: CarouselAutoplayOptions;
  @Input() breakpoints: CarouselBreakpoint;

  @Output() cardOneClick = new EventEmitter();
  @Output() cardOneAdditionalButtonClick = new EventEmitter<CardOneButtonOutput>();
  @Output() cardOneImageButtonClick = new EventEmitter<CardOneButtonOutput>();

  async ngOnInit() {
    const swiperEl = document.querySelector('swiper-container');

    // register Swiper custom elements
    await register();

    const params = {
      injectStyles: true,
      slidesPerView: this.slidesPerView,
      spaceBetween: this.spaceBetween,
      navigation: this.navigation,
      loop: this.loop,
      mousewheel: this.mousewheel,
      pagination: {
        enabled: this.pagination,
        clickable: true
      },
      autoplay: this.autoplay ? {
        delay: this.autoplay.delay,
        disableOnInteraction: false
      } : false
    }

    Object.assign(swiperEl, params);

    swiperEl.initialize();
  }

  ngOnChanges() {
    this.initDefault();
  }

  initDefault() {
    if (this.breakpoints == null) {
      this.breakpoints = {
        '0': {
          slidesPerView: 1,
          spaceBetween: 10
        },
        '600': {
          slidesPerView: 2,
          spaceBetween: 20
        },
        '900': {
          slidesPerView: this.slidesPerView - 1,
          spaceBetween: 20
        },
        '1200': {
          slidesPerView: this.slidesPerView,
          spaceBetween: 20
        }
      };
    }
  }

  onClickCardOneAdditionalButton(event: CardOneButtonOutput) {
    this.cardOneAdditionalButtonClick.emit(event);
  }

  onClickCardOneImageButton(event: CardOneButtonOutput) {
    this.cardOneImageButtonClick.emit(event);
  }

  onClickCardOne(event: any) {
    this.cardOneClick.emit(event);
  }

}
