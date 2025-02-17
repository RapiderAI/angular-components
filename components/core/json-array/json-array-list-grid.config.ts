import { ActionBehavior } from '@rapider/angular-components/core/action';
import { CrudTableViewConfig } from '@rapider/angular-components/core/list-grid';

export const JSON_ARRAY_LIST_GRID_CONFIG: CrudTableViewConfig = {
  defaultSearchField: 'title',
  columns: [],
  listActions: [],
  itemActions: [{
    icon: { name: 'far fa-trash' },
    behavior: ActionBehavior.Emit,
    name: 'DELETE'
  },
  {
    icon: { name: 'fas fa-pen' },
    behavior: ActionBehavior.Emit,
    name: 'EDIT'
  }],
  orderable: true,
  searchable: false,
  columnVisibilitySelectable: false
};
