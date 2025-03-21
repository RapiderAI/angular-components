import { PatternInformation } from '@rapider/angular-components/input-validator-info';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormInputValidatorInfoItem extends CrudFormItem {
  relatedFieldName: string;
  patternInfos: PatternInformation[];
}
