import { NgModule } from '@angular/core';
import { FormatDatePipe } from './format-date.pipe';


@NgModule({
  imports: [FormatDatePipe],
  exports: [FormatDatePipe]
})
export class FormatDateModule { }
