import { NgZorroIconTheme } from '@rapider/angular-components/core/icon';
import { RadioGroupOptions } from '@rapider/angular-components/core/radio-group';

export const ngZorroIconThemeOptionsConfig: RadioGroupOptions[] = [
  {
    value: NgZorroIconTheme.Outline,
    label: 'Outline'
  },
  {
    value: NgZorroIconTheme.Fill,
    label: 'Fill'
  },
  {
    value: NgZorroIconTheme.TwoTone,
    label: 'Two Tone'
  }
];
