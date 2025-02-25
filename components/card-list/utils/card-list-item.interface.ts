import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { AdditionalSubTitle } from '@rapider/angular-components/core/card';
import { CardButton } from '@rapider/angular-components/core/card';

export interface CardListItem {
  avatar?: string;
  title?: HeadingComponentConfig;
  subTitle?: HeadingComponentConfig;
  date?: Date;
  additionalSubTitles?: AdditionalSubTitle[];
  data?: any;
  buttons?: CardButton[];
}
