import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';

@NgModule({
  exports: [CalendarComponent],
  imports: [CalendarComponent]
})
export class CalendarModule { }
