import { ButtonType } from '@rapider/angular-components/core/button';
import { CrudFormConfig, CrudFormConfigInputChangeReaction } from '@rapider/angular-components/core/edit-form';
import { CrudFormConfigSubmitButton, FormLayout } from '@rapider/angular-components/core/edit-form';

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
