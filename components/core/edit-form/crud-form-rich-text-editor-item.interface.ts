import { RichTextEditorTheme, RichTextEditorType } from '../rich-text-editor';
import { CrudFormItem } from './crud-form-item.interface';
import { CrudFormMentionItem } from './crud-form-mention-item.interface';

export interface CrudFormRichTextEditorItem extends CrudFormItem, CrudFormMentionItem {
  editorType?: RichTextEditorType;
  editorTheme?: RichTextEditorTheme;
  height?: number; /* as pixel */
}
