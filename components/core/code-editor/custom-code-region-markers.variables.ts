import { FileType } from "./file-type.enum";
import { markers } from "./markers.variables";

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
  