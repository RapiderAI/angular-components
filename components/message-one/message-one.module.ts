import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderMessageOneComponent } from './message-one.component';
import { RappiderAvatarModule } from '../avatar/avatar.module';
import { RappiderHeadingModule } from '../heading/heading.module';
import { RappiderTextModule } from '../text/text.module';
import { RappiderLabelModule } from '../label/label.module';
import { RappiderParagraphModule } from '../paragraph/paragraph.module';
import { RappiderButtonModule } from '../button/button.module';


@NgModule({
  imports: [RappiderMessageOneComponent],
  exports: [RappiderMessageOneComponent]
})
export class RappiderMessageOneModule { }
