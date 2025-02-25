import { Action } from './action.interface';

export interface ActionResponse {
  action: Action;
  data?: any;
  rowIndex?: number;
}
