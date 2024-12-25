import { NgModule } from '@angular/core';
import { ParagraphComponent } from './paragraph.component';

@NgModule({
  exports: [ParagraphComponent],
  imports: [ParagraphComponent]
})
export class ParagraphModule { }