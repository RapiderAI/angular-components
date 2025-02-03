export interface DiffEditorModel {
    code: string;
    language: string;
}
export interface MonacoEditorModel {
    value: string;
    language?: string;
    uri?: any;
}

export interface MonacoEditorRegion {
    key: string;
    startLine: number;
    endLine: number;
    content: string;
}
