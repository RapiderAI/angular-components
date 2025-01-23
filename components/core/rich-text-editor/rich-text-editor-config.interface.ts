import { RichTextEditorTheme } from '@rapider/angular-components/core/rich-text-editor/rich-text-editor-theme.enum';
import { RichTextEditorType } from '@rapider/angular-components/core/rich-text-editor/rict-text-editor-type.enum';

export interface RichTextEditorComponentConfig {
    editorType?: RichTextEditorType;
    theme?: RichTextEditorTheme;
    placeholder?: string;
    cssStyle?: { [key: string]: any };
    cssClass?: string;
    mentionSupported?: false;
    mentionValues?: string[];
}
