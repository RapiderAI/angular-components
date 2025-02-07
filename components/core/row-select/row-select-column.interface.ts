import { SelectComponentConfig } from '@rapider/angular-components/select';

export interface RowSelectColumn {
  fieldName: string;
  unique?: boolean;
  validators?: any[];
  visible?: boolean;
  selectConfig?: SelectComponentConfig;
}
