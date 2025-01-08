import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';

@NgModule({
  exports: [AvatarComponent],
  imports: [AvatarComponent]
})
export class AvatarModule { }