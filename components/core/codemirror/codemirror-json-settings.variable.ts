import { CodeMirrorMode } from './codemirror-mode.enum';
import { CodeMirrorSettings } from './codemirror-settings.interface';
import { CodeMirrorTheme } from './codemirror-theme.enum';

export const CODEMIRROR_JSON_SETTINGS: CodeMirrorSettings = {
  mode: { name: CodeMirrorMode.Javascript, json: false },
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
