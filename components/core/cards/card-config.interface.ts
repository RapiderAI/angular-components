import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ItemPerRow } from '@rapider/angular-components/core/card-one-list';
import { CardOneComponentConfig } from '@rapider/angular-components/card-one';
import { MenuConfig } from '@rapider/angular-components/core/menu';
import { PaginationComponentConfig } from '@rapider/angular-components/pagination';
import { SelectComponentConfig } from '@rapider/angular-components/select';
import { TitleToolbarComponentConfig } from '@rapider/angular-components/title-toolbar';

export interface CardsConfig {
  items?: CardOneComponentConfig[];
  title?: TitleToolbarComponentConfig;
  itemCountPerRow?: ItemPerRow;
  showTitleOnImage?: boolean;
  showDescriptionOnImage?: boolean;
  selectConfig?: SelectComponentConfig;
  paginationConfig?: PaginationComponentConfig;
  showCheckMarkOnCard?: boolean;
  isDynamicPagination?: boolean;
  menuConfig?: MenuConfig;
  buttons?: ButtonComponentConfig[];
}
