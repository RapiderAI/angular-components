import { CrudTableViewConfig, CrudViewColumnType } from '@rappider/rappider-components/utils';

export const JSON_ARRAY_EMPTY_LIST_CONFIG: CrudTableViewConfig = {
  searchable: false,
  columnVisibilitySelectable: false,
  columns: [
    {
      title: 'ID',
      fieldName: 'id',
      type: CrudViewColumnType.Text,
      visible: false,
    },
  ],
  itemActions: []
};
