import { CrudViewColumnType } from './crud-view-column-type.enum';

export interface CrudViewColumn {
  fieldName: string;
  type: CrudViewColumnType;
  routerLink?: string;
  queryParams?: Record<string, unknown>;
  format?: string;
  visible?: boolean;
  cssClass?: string;
  cssStyle?: { [key: string]: any };
}
