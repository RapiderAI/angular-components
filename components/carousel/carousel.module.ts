import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderCarouselComponent } from './carousel.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RappiderTextModule } from '../text/text.module';

@NgModule({
  declarations: [
    RappiderCarouselComponent
  ],
  imports: [
    CommonModule,
    NzCarouselModule,
    RappiderTextModule
  ],
  exports: [
    RappiderCarouselComponent
  ]
})
export class RappiderCarouselModule { }
