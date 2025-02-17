import { ListGridOrderType } from './list-grid-order-type.enum';

export interface ListGridOrder {
  type: ListGridOrderType;
  fieldName: string;
}
