import { CodeMirrorMode } from './codemirror-mode.enum';
import { CodeMirrorSettings } from './codemirror-settings.interface';
import { CodeMirrorTheme } from './codemirror-theme.enum';

export const CODEMIRROR_CSS_SETTINGS: CodeMirrorSettings = {
  mode: { name: CodeMirrorMode.CSS, json: true },
  theme: CodeMirrorTheme.Default,
  autoRefresh: true,
  lineNumbers: true,
  autoCloseBrackets: true,
  lineWrapping: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  matchBrackets: true,
  lint: true
};
