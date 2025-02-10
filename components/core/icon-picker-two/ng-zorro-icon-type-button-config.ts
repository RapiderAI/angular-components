import { CheckboxType } from '@rapider/angular-components/core/checkbox';
import { CheckboxListDirection } from '@rapider/angular-components/core/checkbox-list';
import { CheckboxListComponentConfig } from '@rapider/angular-components/checkbox-list';
import { NgZorroIconTheme } from '@rapider/angular-components/core/icon';

export const ngZorroIconTypeButtonsConfig: CheckboxListComponentConfig = {
  options: [
    {
      value: NgZorroIconTheme.Outline,
      key: {
        text: NgZorroIconTheme.Outline
      },
      checkboxType: CheckboxType.Button
    },
    {
      value: NgZorroIconTheme.Fill,
      key: {
        text: NgZorroIconTheme.Fill
      },
      checkboxType: CheckboxType.Button
    },
    {
      value: NgZorroIconTheme.TwoTone,
      key: {
        text: NgZorroIconTheme.TwoTone
      },
      checkboxType: CheckboxType.Button
    }
  ],
  direction: CheckboxListDirection.Row
};
