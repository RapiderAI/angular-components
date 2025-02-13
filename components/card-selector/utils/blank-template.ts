import { CardOneComponentConfig } from 'libs/components/src/lib/utils/card-one';
import { HeadingType } from 'libs/components/src/lib/utils/heading';

export const BlankTemplate: CardOneComponentConfig = {
  data: {
    id: null
  },
  image: {
    source: 'assets/img/placeholders/img-placeholder.png',
  },
  titles: [
    {
      type: HeadingType.H4,
      content: 'Blank'
    }
  ],
  descriptions: [
    {
      content: 'Blank template'
    }
  ]
};
