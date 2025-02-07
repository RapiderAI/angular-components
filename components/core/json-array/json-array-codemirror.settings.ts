import { CodeMirrorMode } from '../codemirror/codemirror-mode.enum';
import { CodeMirrorSettings } from '../codemirror/codemirror-settings.interface';
import { CodeMirrorTheme } from '../codemirror/codemirror-theme.enum';

export const JSON_CODEMIRROR_SETTINGS: CodeMirrorSettings = {
  mode: { name: CodeMirrorMode.Javascript, json: true },
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
