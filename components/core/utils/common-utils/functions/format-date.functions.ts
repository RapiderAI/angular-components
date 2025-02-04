import * as moment from 'moment-timezone';

export function formatDateLongUS(date: Date): string {
  return moment.tz(date, 'America/New_York').format('LLL');
}
