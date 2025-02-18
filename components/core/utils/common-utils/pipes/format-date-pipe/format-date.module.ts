/* angular libs */
import { NgModule } from '@angular/core';

/* pipe */
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  imports: [
    FormatDatePipe
  ],
  providers: [
  ],
  exports: [
    FormatDatePipe
  ]
})
export class FormatDateModule {
}
