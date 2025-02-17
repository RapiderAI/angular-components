import { Injectable } from '@angular/core';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TemplatingService {

  constructor() { }

  execTemplate(templateString: string, data: any) {
    const regex = /{{(.+?)}}/g;
    let updatedText = templateString;
    /* eslint-disable no-constant-condition*/
    while (true) {
      /* get matched text in the template */
      const varFields = regex.exec(templateString);
      /* if there is no matched text, break fn */
      if (!varFields) {
        break;
      }
      /* target replacing string */
      const replacingText = varFields[0];
      /* target field name in the data to be replaced */
      const replacingDataFieldName = (<string>varFields[1]).trim();
      /* get needed value from the specified data */
      const replacingData = get(data, replacingDataFieldName);
      /* replace text */
      updatedText = updatedText.replace(replacingText, replacingData);
    }
    return updatedText;
  }

}
