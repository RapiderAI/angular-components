import { RowFormColumn } from '@rapider/angular-components/core/row-form';

export interface InlineRowFormComponentConfig {
  orderable?: boolean;
  columns: RowFormColumn[];
  orderNumbersVisibility?: boolean;
}
