import { FileType } from "./file-type.enum";

export const markers = {
  html: {
    startRegionMarker: /<!--\s*#region\s+customCode\s*-->/,
    endRegionMarker: /<!--\s*#endregion\s+customCode\s*-->/
  },
  typeScript: {
    startRegionMarker: /\/\/\s*#region\s+customCode/,
    endRegionMarker: /\/\/\s*#endregion\s+customCode/
  },
  scss: {
    startRegionMarker: /\/\/\s*#region\s+customCode/,
    endRegionMarker: /\/\/\s*#endregion\s+customCode/
  }
}

export const CUSTOM_CODE_REGION_MARKERS = [
  {
    key: FileType.Html,
    startRegionMarker: markers.html.startRegionMarker,
    endRegionMarker: markers.html.endRegionMarker
  },
  {
    key: FileType.TypeScript,
    startRegionMarker: markers.typeScript.startRegionMarker,
    endRegionMarker: markers.typeScript.endRegionMarker
  },
  {
    key: FileType.Scss,
    startRegionMarker: markers.scss.startRegionMarker,
    endRegionMarker: markers.scss.endRegionMarker
  }
];
