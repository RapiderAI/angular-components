import { Pipe, PipeTransform } from '@angular/core';
import { formatDateLongUS } from '@rapider/angular-components/core/utils/common-utils/functions';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(date: Date | string | number): string {
    return formatDateLongUS(new Date(date));
  }

}
