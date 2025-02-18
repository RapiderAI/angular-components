import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CrudFormItem } from './crud-form-item.interface';
import { InputSize } from '@rapider/angular-components/core/style';

export interface CrudFormTreeSelectItem extends CrudFormItem {
  tree?: NzTreeNodeOptions[];
  multipleSelect?: boolean;
  defaultExpandAll?: boolean;
  placeholder?: string;
  size?: InputSize;
}
