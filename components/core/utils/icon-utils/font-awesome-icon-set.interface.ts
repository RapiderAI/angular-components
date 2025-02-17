import { IconSet } from './icon-set.interface';
import { IconType } from './icon-type.enum';


export interface FontAwesomeIconSet extends IconSet {
  name: string; /* icon class */
  type: IconType.FontAwesome;
}
