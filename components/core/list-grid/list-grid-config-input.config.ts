import { CrudFormConfig, CrudFormJsonArrayItem, CrudFormObjectItem, CrudFormSelectItem, CrudFormTextBoxItem, CrudViewFormItemType } from '@rapider/angular-components/core/edit-form';
import { FormLayout } from '@rapider/angular-components/core/edit-form';
import { SelectMode } from '@rapider/angular-components/core/select';

export const LIST_GRID_CONFIG_INPUT: CrudFormConfig = {
  items: [
    <CrudFormObjectItem>{
      title: 'Title',
      fieldName: 'title',
      type: CrudViewFormItemType.TextBox,
    },
    {
      title: 'Searchable',
      fieldName: 'searchable',
      type: CrudViewFormItemType.CheckBox
    },
    {
      title: 'Column Visibility Selectable',
      fieldName: 'columnVisibilitySelectable',
      type: CrudViewFormItemType.CheckBox
    },
    <CrudFormTextBoxItem>{
      title: 'Default Search Field',
      fieldName: 'defaultSearchField',
      type: CrudViewFormItemType.TextBox
    },
    {
      title: 'Columns',
      fieldName: 'columns',
      type: CrudViewFormItemType.JsonArray,
      previewFieldNames: ['title', 'fieldName', 'type']
    },
    {
      title: 'Selectable',
      fieldName: 'selectable',
      type: CrudViewFormItemType.CheckBox
    },
    <CrudFormJsonArrayItem>{
      title: 'List Actions',
      fieldName: 'listActions',
      type: CrudViewFormItemType.JsonArray,
      previewFieldNames: ['name']
    },
    <CrudFormSelectItem>{
      title: 'Size',
      fieldName: 'size',
      options: [
        {
          key: 'Default',
          value: 'small'
        },
        {
          key: 'Small',
          value: 'small'
        },
        {
          key: 'Large',
          value: 'large'
        }
      ],
      type: CrudViewFormItemType.Select,
      settings: {
        mode: SelectMode.Single,
        searchable: false
      }
    },
    {
      title: 'Orderable',
      fieldName: 'Orderable',
      type: CrudViewFormItemType.CheckBox
    }
  ],
  itemSettings: {
    inputComponentSize: {
      xs: 24
    },
    labelComponentSize: {
      xs: 24
    }
  },
  submitButton: {
    visible: false
  },
  formLayout: FormLayout.Vertical
};
