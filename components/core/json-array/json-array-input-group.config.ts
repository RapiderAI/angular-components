import { InputSize } from '@rapider/angular-components/core/style';
import { RadioGroupComponentConfig } from '@rapider/angular-components/radio-group';
import { RadioGroupSize } from '@rapider/angular-components/core/radio-group';
import { JsonArrayComponentOption } from './json-array-component-option.enum';

export const RADIO_GROUP_COMPONENT_CONFIG: RadioGroupComponentConfig = {
  options: [
    {
      value: JsonArrayComponentOption.GridView,
      label: 'Grid View',
      labelSize: InputSize.Small
    },
    {
      value: JsonArrayComponentOption.CodeMirror,
      label: 'Code Mirror',
      labelSize: InputSize.Small
    }
  ],
  size: RadioGroupSize.Small
};
