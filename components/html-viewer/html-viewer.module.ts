import { NgModule } from '@angular/core';
import { HtmlViewerComponent } from './html-viewer.component';

@NgModule({
  exports: [HtmlViewerComponent],
  imports: [HtmlViewerComponent]
})
export class HtmlViewerModule { }