import moment from 'moment-timezone';

export function formatDateLongUS(date: Date): string {
  return moment(date).format('LLL');
}
