import { CheckboxType } from '@rapider/angular-components/core/checkbox';
import { CheckboxListDirection } from '@rapider/angular-components/core/checkbox-list';
import { CheckboxListComponentConfig } from '@rapider/angular-components/checkbox-list';
import { FontAwesomeIconType } from './font-awesome-icon-type.enum';

export const fontAwesomeIconTypeButtonsConfig: CheckboxListComponentConfig = {
  options: [
    {
      value: FontAwesomeIconType.Solid,
      key: {
        text: 'Solid'
      },
      checkboxType: CheckboxType.Button
    },
    {
      value: FontAwesomeIconType.Regular,
      key: {
        text: 'Regular'
      },
      checkboxType: CheckboxType.Button
    },
    {
      value: FontAwesomeIconType.Light,
      key: {
        text: 'Light'
      },
      checkboxType: CheckboxType.Button
    },
    {
      value: FontAwesomeIconType.Thin,
      key: {
        text: 'Thin'
      },
      checkboxType: CheckboxType.Button
    },
    {
      value: FontAwesomeIconType.Duotone,
      key: {
        text: 'Duotone'
      },
      checkboxType: CheckboxType.Button
    }
  ],
  direction: CheckboxListDirection.Row
};
