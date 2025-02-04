import { SelectableOption } from '@rapider/angular-components/core/form-utils';
import { GrouppedOption } from '@rapider/angular-components/core/select';

export interface DynamicDataForSelectBox {
  fieldName: string;
  options: SelectableOption[] | GrouppedOption[];
};
