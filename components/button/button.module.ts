import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';

@NgModule({
  exports: [ButtonComponent],
  imports: [ButtonComponent]
})
export class ButtonModule { }