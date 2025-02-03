import { RichTextEditorTheme } from '@rapider/angular-components/core/rich-text-editor';
import { RichTextEditorType } from '@rapider/angular-components/core/rich-text-editor';

export interface RichTextEditorComponentConfig {
    editorType?: RichTextEditorType;
    theme?: RichTextEditorTheme;
    placeholder?: string;
    cssStyle?: { [key: string]: any };
    cssClass?: string;
    mentionSupported?: false;
    mentionValues?: string[];
}
