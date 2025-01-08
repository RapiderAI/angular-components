import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';

@NgModule({
  exports: [ImageComponent],
  imports: [ImageComponent]
})
export class ImageModule { }