import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CrudFormItem } from './crud-form-item.interface';
import { InputSize } from '../shared/input-size/input-size.enum';

export interface CrudFormTreeSelectItem extends CrudFormItem {
  tree?: NzTreeNodeOptions[];
  multipleSelect?: boolean;
  defaultExpandAll?: boolean;
  placeholder?: string;
  size?: InputSize;
}
