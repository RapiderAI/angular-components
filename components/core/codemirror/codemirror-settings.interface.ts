import { CodeMirrorMode } from './codemirror-mode.enum';
import { CodeMirrorObjectMode } from './codemirror-object-mode.interface';
import { CodeMirrorTheme } from './codemirror-theme.enum';

export interface CodeMirrorSettings {
  mode?: CodeMirrorMode | CodeMirrorObjectMode;
  theme?: CodeMirrorTheme;
  lineNumbers?: boolean;
  autoRefresh?: boolean;
  autoCloseBrackets?: boolean;
  fixedGutter?: boolean;
  lint?: boolean;
  lineWrapping?: boolean;
  foldGutter?: boolean;
  gutters?: any[];
  matchBrackets?: boolean;
  /**
   * When pasting something from an external source (not from the editor itself),
   *  if the number of lines matches the number of selection, CodeMirror will by default
   * insert one line per selection. You can set this to false to disable that behavior.
   */
  pasteLinesPerSelection?: boolean;
}
