import { FileType } from "./file-type.enum";

export const CUSTOM_CODE_REGION_REGEXES = [
  {
    key: FileType.Html,
    startRegionRegex: /<!--\s*#region customCode:\s*([\w-]+)\s*-->/,
    endRegionRegex: /<!--\s*#endregion customCode:\s*([\w-]+)\s*-->/
  },
  {
    key: FileType.TypeScript,
    startRegionRegex: /\/\/\s*#region customCode:\s*([\w-]+)/,
    endRegionRegex: /\/\/\s*#endregion customCode:\s*([\w-]+)/
  },
  {
    key: FileType.Scss,
    startRegionRegex: /\/\/\s*#region customCode:\s*([\w-]+)/,
    endRegionRegex: /\/\/\s*#endregion customCode:\s*([\w-]+)/
  }
];
