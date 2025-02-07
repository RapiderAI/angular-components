import { EditFormComponentConfig } from '../form-card';
import { EventStatus } from './calendar-event-status.enum';

export interface CalendarEvent {
  title: string;
  description?: string;
  eventType?: EventStatus;
  starts: string;
  ends?: string;
  location?: string;
  invites?: string[];

  eventEditMode?: boolean;
  [key: string]: any;
}
