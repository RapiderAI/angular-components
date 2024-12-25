import { NgModule } from '@angular/core';
import { HeadingComponent } from './heading.component';

@NgModule({
  exports: [HeadingComponent],
  imports: [HeadingComponent]
})
export class HeadingModule { }