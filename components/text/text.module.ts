import { NgModule } from '@angular/core';
import { TextComponent } from './text.component';

@NgModule({
  exports: [TextComponent],
  imports: [TextComponent]
})
export class TextModule { }