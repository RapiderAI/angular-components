import { Validators } from '@angular/forms';
import {
  InputSize,
  CrudFormConfig,
  CrudFormTextBoxItem,
  CrudViewFormItemType,
  TextBoxType,
  CrudFormSelectItem,
  CrudTableViewConfig,
  CrudViewColumnType,
  ActionBehavior,
  ButtonType,
} from 'libs/components/src/lib/utils';
import { POP_CONFIRM_DELETE_ACTION } from 'libs/shared/src/lib/configs/pop-confirm-button/pop-confirm-button-config';

export const VALIDATORS_PATTERN_CONFIG: CrudTableViewConfig = {
  defaultSearchField: 'type',
  columns: [
    {
      title: 'ID',
      fieldName: 'id',
      type: CrudViewColumnType.Text,
      visible: false
    },
    {
      title: 'Type',
      fieldName: 'type',
      type: CrudViewColumnType.Text
    },
    {
      title: 'Value',
      fieldName: 'value',
      type: CrudViewColumnType.Text
    },
    {
      title: 'Error Message',
      fieldName: 'errorMessage',
      type: CrudViewColumnType.Text
    }
  ],
  listActions: [
    {
      text: 'Add Validator',
      behavior: ActionBehavior.Emit,
      buttonType: ButtonType.Default,
      icon: { name: 'fas fa-plus' }
    }
  ],
  itemActions: [
    {
      text: 'SHARED.EDIT',
      name: 'edit',
      icon: { name: 'far fa-edit' },
      behavior: ActionBehavior.Emit
    },
    {
      text: POP_CONFIRM_DELETE_ACTION.text,
      name: POP_CONFIRM_DELETE_ACTION.name,
      popconfirmTitle: 'This validator will be deleted. Are you sure?',
      emitWithoutPopconfirm: POP_CONFIRM_DELETE_ACTION.emitWithoutPopconfirm,
      behavior: POP_CONFIRM_DELETE_ACTION.behavior,
      icon: POP_CONFIRM_DELETE_ACTION.icon,
      popconfirmCancelText: POP_CONFIRM_DELETE_ACTION.popconfirmCancelText,
      popconfirmOkText: POP_CONFIRM_DELETE_ACTION.popconfirmOkText,
      popconfirmOkDanger: POP_CONFIRM_DELETE_ACTION.popconfirmOkDanger,
    }
  ]
};

export const VALIDATORS_PATTERN_FORM_CONFIG_WITH_VALUE: CrudFormConfig = {
  items: [
    <CrudFormSelectItem>{
      title: 'Type',
      fieldName: 'type',
      type: CrudViewFormItemType.Select,
      textType: TextBoxType.Text,
      placeholder: 'Type',
      showRequiredSign: true,
      index: 1,
      options: [
        {
          key: 'Required',
          value: 'Validators.required'
        },
        {
          key: 'Minimum Number',
          value: 'Validators.min()'
        },
        {
          key: 'Maximum Number',
          value: 'Validators.max()'
        },
        {
          key: 'True Check',
          value: 'Validators.requiredTrue'
        },
        {
          key: 'Email',
          value: 'Validators.email'
        },
        {
          key: 'Minimum Length',
          value: 'Validators.minLength()'
        },
        {
          key: 'Maximum Length',
          value: 'Validators.maxLength()'
        },
        {
          key: 'Pattern',
          value: 'Validators.pattern()'
        },
        {
          key: 'Null Check',
          value: 'Validators.nullValidator'
        }
      ],
      validators: [
        {
          type: Validators.required,
          errorKey: 'required',
          errorMessage: 'ERRORS.PATTERN_MESSAGES.REQUIRED_FIELD_MESSAGE'
        }
      ]
    },
    {
      title: 'Value',
      fieldName: 'value',
      type: CrudViewFormItemType.Number,
      showRequiredSign: true,
      placeholder: 'Value',
      index: 2,
      validators: [
        {
          type: Validators.required,
          errorKey: 'required',
          errorMessage: 'ERRORS.PATTERN_MESSAGES.REQUIRED_FIELD_MESSAGE'
        }
      ]
    },
    <CrudFormTextBoxItem>{
      title: 'Error Message',
      fieldName: 'errorMessage',
      type: CrudViewFormItemType.TextBox,
      textType: TextBoxType.Text,
      showRequiredSign: true,
      placeholder: 'Error Message',
      size: InputSize.Default,
      index: 3,
      validators: [
        {
          type: Validators.required,
          errorKey: 'required',
          errorMessage: 'ERRORS.PATTERN_MESSAGES.REQUIRED_FIELD_MESSAGE'
        }
      ]
    }
  ],
  submitButton: { visible: false },
  itemSettings: {
    inputComponentSize: {
      xs: 24
    }
  },
};

export const VALIDATORS_PATTERN_FORM_CONFIG_WITHOUT_VALUE: CrudFormConfig = {
  items: [
    <CrudFormSelectItem>{
      title: 'Type',
      fieldName: 'type',
      type: CrudViewFormItemType.Select,
      textType: TextBoxType.Text,
      placeholder: 'Type',
      showRequiredSign: true,
      index: 1,
      options: [
        {
          key: 'Required',
          value: 'Validators.required'
        },
        {
          key: 'Minimum Number',
          value: 'Validators.min()'
        },
        {
          key: 'Maximum Number',
          value: 'Validators.max()'
        },
        {
          key: 'True Check',
          value: 'Validators.requiredTrue'
        },
        {
          key: 'Email',
          value: 'Validators.email'
        },
        {
          key: 'Minimum Length',
          value: 'Validators.minLength()'
        },
        {
          key: 'Maximum Length',
          value: 'Validators.maxLength()'
        },
        {
          key: 'Pattern',
          value: 'Validators.pattern()'
        },
        {
          key: 'Null Check',
          value: 'Validators.nullValidator'
        }
      ],
      validators: [
        {
          type: Validators.required,
          errorKey: 'required',
          errorMessage: 'ERRORS.PATTERN_MESSAGES.REQUIRED_FIELD_MESSAGE'
        }
      ]
    },
    <CrudFormTextBoxItem>{
      title: 'Error Message',
      fieldName: 'errorMessage',
      type: CrudViewFormItemType.TextBox,
      textType: TextBoxType.Text,
      showRequiredSign: true,
      placeholder: 'Error Message',
      size: InputSize.Default,
      index: 3,
      validators: [
        {
          type: Validators.required,
          errorKey: 'required',
          errorMessage: 'ERRORS.PATTERN_MESSAGES.REQUIRED_FIELD_MESSAGE'
        }
      ]
    }
  ],
  submitButton: { visible: false },
  itemSettings: {
    inputComponentSize: {
      xs: 24
    }
  },
};
