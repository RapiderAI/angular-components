import { ButtonType } from '@rapider/angular-components/core/button';
import { CrudFormConfig, CrudFormConfigInputChangeReaction, CrudFormSelectItem, CrudFormValueEmitMode, CrudViewFormItemType } from '@rapider/angular-components/core/edit-form';

export const CALENDAR_FORM_CONFIG: CrudFormConfig = {
    items: [
        {
            fieldName: 'title',
            title: 'Title',
            type: CrudViewFormItemType.TextBox
        },
        {
            fieldName: 'description',
            title: 'Description',
            type: CrudViewFormItemType.TextArea
        },
        <CrudFormSelectItem>{
            fieldName: 'eventType',
            title: 'Event Type',
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
            title: 'Starts',
            type: CrudViewFormItemType.DateTimePicker
        },
        {
            fieldName: 'ends',
            title: 'Ends',
            type: CrudViewFormItemType.DateTimePicker
        },
        {
            fieldName: 'location',
            title: 'Location',
            type: CrudViewFormItemType.TextBox
        },
        {
            fieldName: 'invites',
            title: 'Invites',
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
