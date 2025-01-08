import { TagType } from './tag-type.enum';

export interface Tag {
  mode?: TagType;
  checked?: boolean;
  color?: string;
  text?: string;
}
