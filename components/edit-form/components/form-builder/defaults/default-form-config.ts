import { ButtonType } from '../../../../../utils/button/button-type.enum';
import { CrudFormConfigInputChangeReaction } from '../../../../../utils/edit-form/crud-form-config-input-change-reaction.enum';
import { CrudFormConfigSubmitButton } from '../../../../../utils/edit-form/crud-form-config-submit-button.interface';
import { CrudFormConfig } from '../../../../../utils/edit-form/crud-form-config.interface';
import { FormLayout } from '../../../../../utils/edit-form/form-layout.enum';

export const defaultSubmitButtonConfig: CrudFormConfigSubmitButton = {
	text: 'Save',
	size: 'large',
	block: true,
	type: ButtonType.Primary
};

export const defaultCrudViewFormConfig: CrudFormConfig = {
	items: undefined,
	itemSettings: {
		inputComponentSize: {
			xs: 24
		},
		labelComponentSize: {
			xs: 24
		}
	},
	submitButton: defaultSubmitButtonConfig,
	formLayout: FormLayout.Horizontal,
	inputChangeReaction: CrudFormConfigInputChangeReaction.Default
};
