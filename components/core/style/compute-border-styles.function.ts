// Custom function to set border and radius fields of elements
export function computeBorderStyles(borderSettings: { border?: string; borderRadius?: string }): { [key: string]: string } {
  const borderStyles: { [key: string]: string } = {};
  // Border settings
  const borderProperties = ['border-width', 'border-style', 'border-color'];

  if (borderSettings?.border) {
    const borderParts = borderSettings.border.split(' ');

    borderParts.forEach((part, index) => {
      if (borderProperties[index]) {
        borderStyles[borderProperties[index]] = part;
      }
    });
  } else {
    borderProperties.forEach(property => {
      delete borderStyles[property];
    });
  }

  // Border radius settings
  if (borderSettings?.borderRadius) {
    borderStyles['border-radius'] = borderSettings.borderRadius;
  } else {
    delete borderStyles['border-radius'];
  }

  return borderStyles;
}
