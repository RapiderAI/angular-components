import { Injectable } from '@angular/core';
import { camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase, upperFirst } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StringUtilityService {

  static toCamelCase(str) {
    return camelCase(str);
  }

  static toTitleCase(str) {
    return startCase(camelCase(str));
  }

  static toPascalCase(str) {
    return startCase(camelCase(str)).replace(/ /g, '');
  }

  static toConstantCase(str) {
    return upperCase(str).replace(/ /g, '_');
  }

  static toDotCase(str) {
    return lowerCase(str).replace(/ /g, '.');
  }

  static toKebabCase(str) {
    return kebabCase(str);
  }

  static toLowerCase(str) {
    return lowerCase(str).replace(/ /g, '');
  }

  static toPathCase(str) {
    return lowerCase(str).replace(/ /g, '/');
  }

  static toSnakeCase(str) {
    return snakeCase(str);
  }

  static toSentenceCase(str) {
    return upperFirst(lowerCase(str));
  }

  /* John Doe => JD */
  static getInitialCharactersOfString(str: string): string {
    if (str) {
      // Use a simpler regex that matches alphabetic characters
      const rgx = /([A-Za-z])/g;  // Matches any alphabetic character
    
      const initials = [...str.matchAll(rgx)]; // No need for `|| []` here
      
      // Combine the first and last matched initials (if available) and convert to uppercase
      const firstInitial = initials.shift()?.[1] || '';
      const lastInitial = initials.pop()?.[1] || '';
    
      // Return the initials as a concatenated string in uppercase
      return (firstInitial + lastInitial).toUpperCase();
    }
  
    // Return an empty string if the input is invalid or empty
    return '';
  }  

  static camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0
          ? letter.toLowerCase()
          : letter.toUpperCase()
      )
      .replace(/\s+/g, '');
  }
}
