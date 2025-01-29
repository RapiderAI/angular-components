import { IconType } from '@rapider/angular-components/core/icon';
import { FONT_AWESOME_ICONS } from '@rapider/angular-components/core/icon-picker';
import { IconPickerConfig } from '@rapider/angular-components/icon-picker';
import { NG_ZORRO_ICONS } from '@rapider/angular-components/core/icon-picker';

export const ICON_PICKER_CONFIG: IconPickerConfig = {
  sections: [
    {
      iconType: IconType.NgZorro,
      items: NG_ZORRO_ICONS
    },
    {
      iconType: IconType.FontAwesome,
      items: FONT_AWESOME_ICONS
    }
  ]
};
