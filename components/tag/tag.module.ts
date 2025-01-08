import { NgModule } from '@angular/core';
import { TagComponent } from './tag.component';

@NgModule({
  exports: [TagComponent],
  imports: [TagComponent]
})
export class TagModule { }