import { SelectableOption } from '../form-utils';
import { GrouppedOption } from '../select';

export interface DynamicDataForSelectBox {
  fieldName: string;
  options: SelectableOption[] | GrouppedOption[];
};
