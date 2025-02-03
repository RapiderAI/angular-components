import { customCodeEndRegionHtmlRegex, customCodeEndRegionRegex, customCodeStartRegionHtmlRegex, customCodeStartRegionRegex } from "@rapider/angular-components/monaco-editor";
import { FileType } from "./file-type.enum";

export const CUSTOM_CODE_REGION_REGEXES = [
  {
    key: FileType.Html,
    startRegionRegex: customCodeStartRegionHtmlRegex,
    endRegionRegex: customCodeEndRegionHtmlRegex
  },
  {
    key: FileType.TypeScript,
    startRegionRegex: customCodeStartRegionRegex,
    endRegionRegex: customCodeEndRegionRegex
  },
  {
    key: FileType.Scss,
    startRegionRegex: customCodeStartRegionRegex,
    endRegionRegex: customCodeEndRegionRegex
  }
];
