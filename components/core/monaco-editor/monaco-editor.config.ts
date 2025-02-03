import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MONACO_EDITOR_CONFIG = new InjectionToken('MONACO_EDITOR_CONFIG');

/* These regex values are used to find custom code regions in the monaco editor.
 * These templates are defined in Rapider backend and are used to inject custom code into the monaco editor.
 */
export const customCodeStartRegionRegex = /\/\/\s*#region customCode:\s*([\w-]+)/;
export const customCodeEndRegionRegex = /\/\/\s*#endregion customCode:\s*([\w-]+)/;

// for the html files
export const customCodeStartRegionHtmlRegex = /<!--\s*#region customCode:\s*([\w-]+)\s*-->/;
export const customCodeEndRegionHtmlRegex = /<!--\s*#endregion customCode:\s*([\w-]+)\s*-->/;

export interface MonacoEditorConfig {
  baseUrl?: string;
  defaultOptions?: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMonacoLoad?: Function;
}
