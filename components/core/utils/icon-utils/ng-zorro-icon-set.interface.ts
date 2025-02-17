import { IconSet } from './icon-set.interface';
import { IconType } from './icon-type.enum';
import { NgZorroIconTheme } from './ng-zorro-icon-theme.enum';


export interface NgZorroIconSet extends IconSet {
  name: string; /* icon class */
  type: IconType.NgZorro;
  theme?: NgZorroIconTheme;
}
