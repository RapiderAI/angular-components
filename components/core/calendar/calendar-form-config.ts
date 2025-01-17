/* I will update this later

import { CrudFormConfig, CrudFormConfigInputChangeReaction, CrudFormSelectItem, CrudFormValueEmitMode, CrudViewFormItemType, ButtonType } from '../edit-form';

export const CALENDAR_FORM_CONFIG: CrudFormConfig = {
    items: [
        {
            fieldName: 'title',
            title: 'SHARED.TITLE',
            type: CrudViewFormItemType.TextBox
        },
        {
            fieldName: 'description',
            title: 'SHARED.DESCRIPTION',
            type: CrudViewFormItemType.TextArea
        },
        <CrudFormSelectItem>{
            fieldName: 'eventType',
            title: 'SHARED.EVENT_TYPE',
            type: CrudViewFormItemType.Select,
            options: [
                {
                    key: 'Success',
                    value: 'success'
                },
                {
                    key: 'Processing',
                    value: 'processing'
                },
                {
                    key: 'Error',
                    value: 'error'
                },
                {
                    key: 'Warning',
                    value: 'warning'
                }
            ]
        },
        {
            fieldName: 'starts',
            title: 'SHARED.STARTS',
            type: CrudViewFormItemType.DateTimePicker
        },
        {
            fieldName: 'ends',
            title: 'SHARED.ENDS',
            type: CrudViewFormItemType.DateTimePicker
        },
        {
            fieldName: 'location',
            title: 'SHARED.LOCATION',
            type: CrudViewFormItemType.TextBox
        },
        {
            fieldName: 'invites',
            title: 'SHARED.INVITES',
            type: CrudViewFormItemType.StringArray
        }
    ],
    submitButton: {
        type: ButtonType.Primary
    },
    formValueEmitMode: CrudFormValueEmitMode.ReturnAllValues,
    inputChangeReaction: CrudFormConfigInputChangeReaction.Default,
    itemSettings: {
        inputComponentSize: {
            sm: 24
        }
    }
}; 
*/