import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge.component';

@NgModule({
  exports: [BadgeComponent],
  imports: [BadgeComponent]
})
export class BadgeModule { }