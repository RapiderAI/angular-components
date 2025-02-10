import { RadioGroupOptions } from '@rapider/angular-components/core/radio-group';
import { FontAwesomeIconType } from './font-awesome-icon-type.enum';

export const fontAwesomeIconStyleOptionsConfig: RadioGroupOptions[] = [
  {
    value: FontAwesomeIconType.Solid,
    label: 'Solid'
  },
  {
    value: FontAwesomeIconType.Regular,
    label: 'Regular'
  },
  {
    value: FontAwesomeIconType.Light,
    label: 'Light'
  },
  {
    value: FontAwesomeIconType.Thin,
    label: 'Thin'
  },
  {
    value: FontAwesomeIconType.Duotone,
    label: 'Duotone'
  }
];
