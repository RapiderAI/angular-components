import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';

@NgModule({
  exports: [AlertComponent],
  imports: [AlertComponent]
})
export class AlertModule { }