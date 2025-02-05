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