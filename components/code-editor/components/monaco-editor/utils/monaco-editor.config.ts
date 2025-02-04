export interface MonacoEditorComponentConfig {
  baseUrl?: string;
  defaultOptions?: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMonacoLoad?: Function;
}
