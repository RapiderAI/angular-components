import { HeadingType } from '@rapider/angular-components/core/heading';

export interface CrudFormSection {
  title?: string;
  key?: string;
  /* Columns to display for the form, on vertical layout, note that this is only implemented on crud fields displayer yet */
  columns?: number;
  /* If the titleType property is provided, a heading type will be applied to the title,
   * this is only implemented in rappider-crud-fields-display component yet
   */
  titleType?: HeadingType;
}
