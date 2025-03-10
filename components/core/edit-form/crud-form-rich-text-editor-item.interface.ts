import { RichTextEditorTheme, RichTextEditorType } from '@rapider/angular-components/core/rich-text-editor';
import { CrudFormItem } from './crud-form-item.interface';
import { CrudFormMentionItem } from './crud-form-mention-item.interface';

export interface CrudFormRichTextEditorItem extends CrudFormItem, CrudFormMentionItem {
  editorType?: RichTextEditorType;
  editorTheme?: RichTextEditorTheme;
  height?: number; /* as pixel */
}
