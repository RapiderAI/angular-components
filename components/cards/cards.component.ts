import { Component, EventEmitter, forwardRef, Input, OnDestroy, Output } from '@angular/core';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CardOneComponentConfig, RappiderCardOneComponent } from '@rapider/angular-components/card-one';
import { ItemPerRow, CardOneListCardClickOutput } from '@rapider/angular-components/core/card-one-list';
import { IconType } from '@rapider/angular-components/core/icon';
import { InputGroupComponentConfig, RappiderInputGroupComponent } from '@rapider/angular-components/input-group';
import { RappiderSelectComponent, SelectComponentConfig } from '@rapider/angular-components/select';
import { SelectMode } from '@rapider/angular-components/core/select';
import { RappiderTitleToolbarComponent, TitleToolbarComponentConfig } from '@rapider/angular-components/title-toolbar';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { MenuConfig } from '@rapider/angular-components/core/menu';
import { PaginationComponentConfig, RappiderPaginationComponent } from '@rapider/angular-components/pagination';
import { RappiderCardOneListComponent } from '@rapider/angular-components/card-one-list';
import { RappiderMenuComponent } from '@rapider/angular-components/menu';
import { RappiderButtonComponent } from '@rapider/angular-components/button';

@Component({
  selector: 'rappider-cards',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    FormsModule,
    RappiderTitleToolbarComponent,
    RappiderCardOneListComponent,
    RappiderCardOneComponent,
    RappiderInputGroupComponent,
    NzSkeletonModule,
    RappiderPaginationComponent,
    RappiderSelectComponent,
    TranslateModule,
    NzIconModule,
    RappiderMenuComponent,
    RappiderButtonComponent
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderCardsComponent),
      multi: true
    }
  ]
})
export class RappiderCardsComponent implements ControlValueAccessor, OnDestroy {

  @Input() title: TitleToolbarComponentConfig;
  @Input() items: CardOneComponentConfig[];
  @Input() itemCountPerRow = ItemPerRow.Three;
  @Input() isLoading = false;
  @Input() showTitleOnImage: boolean;
  @Input() showDescriptionOnImage: boolean;
  @Input() showCheckMarkOnCard: boolean;
  @Input() selectConfig: SelectComponentConfig;
  @Input() paginationConfig: PaginationComponentConfig;
  @Input() showPopover: boolean;
  @Input() showPopoverImage: ImageComponentConfig;
  @Input() isDynamicPagination = false;
  @Input() loadingMessage = 'We are fetching the data, please wait...';
  @Input() topSectionCards: CardOneComponentConfig[];
  @Input() topSectionHeight: string;
  @Input() bottomSectionHeight: string;
  @Input() menuConfig: MenuConfig;
  @Input() buttons: ButtonComponentConfig[];

  @Output() cardClick = new EventEmitter<any>();
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() tagFilterChange = new EventEmitter<string[]>();
  @Output() imageButtonClick = new EventEmitter<any>();
  @Output() avatarButtonClick = new EventEmitter<any>();
  @Output() menuItemClick = new EventEmitter<any>();
  @Output() topButtonsClick = new EventEmitter<any>();

  _value: string;
  selectedId: string;
  searchText: string;
  previousSearchText: string;
  selectedTags: string[] | string;
  /* Search Bar Config */
  inputGroupConfig: InputGroupComponentConfig = {
    textbox: {
      placeholder: 'Search in Templates',
    },
    suffixIcon: {
      name: 'fas fa-search',
      type: IconType.FontAwesome,
    }
  };

  /* searchOptions for fuse */
  searchOptions = {
    threshold: 0.2,
    keys: [
      'titles.content',
      'descriptions.content',
      'descriptions.text',
      'additionalTags.text.text'
    ]
  };

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  ngOnDestroy(): void {
    this.items?.forEach(conf => conf.isSelected = false);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this._value = value;
    this.selectedId = this._value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTopSectionCardClick(data: any, item: CardOneComponentConfig) {
    this.onCardClick({ data, item });
  }

  onCardClick(output: CardOneListCardClickOutput) {
    this.items?.forEach(conf => conf.isSelected = false);
    if (this.selectedId === output.item.data.id) {
      this.selectedId = null;
    } else {
      this.selectedId = output?.item.data?.id;
      this.handleConfigWithSelectedId();
    }
    this.value = this.selectedId;
    this.cardClick.emit(this.value);
  }

  handleConfigWithSelectedId() {
    const selectedTemplateConfig = this.items?.find(conf => conf?.data?.id === this.selectedId);
    if (selectedTemplateConfig && this.showCheckMarkOnCard) {
      selectedTemplateConfig.isSelected = true;
    }
  }

  /* Displaying data according to tag and search filtering */
  getDisplayedData() {
    let dataToDisplay = this.items;
    if (this.selectConfig?.options?.length && this.selectedTags?.length && !this.isDynamicPagination) {
      if ([SelectMode.Multiple, SelectMode.Tags, SelectMode.OptionSelect].includes(this.selectConfig.settings.mode)) {
        dataToDisplay = this.items.filter(item => item.additionalTags?.some(tag => this.selectedTags.includes(tag.text.text)));
      } else {
        dataToDisplay = this.items.filter(item => item.additionalTags?.some(tag => tag.text.text === this.selectedTags));
      }
    }
    if (this.searchText !== this.previousSearchText && this.searchText || this.searchText === '') {
      this.previousSearchText = this.searchText;
      this.searchTextChange.emit(this.searchText);
    }
    return this.searchByOptions(dataToDisplay, this.searchOptions, this.searchText);
  }

  /* Paginates the displayed data */
  getDataWithPagination() {
    if (this.paginationConfig?.showPagination) {
      return this.isDynamicPagination ? this.getDisplayedData() : this.getDisplayedData()?.slice((this.paginationConfig.pageIndex - 1) * this.paginationConfig.pageSize, this.paginationConfig.pageIndex * this.paginationConfig.pageSize);
    } else {
      return this.getDisplayedData();
    }
  }

  searchByOptions(list: any, options: IFuseOptions<unknown>, pattern: string): any {
    if (!pattern || this.isDynamicPagination) {
      return list;
    } else {
      const fuse = new Fuse(list, options);
      return fuse.search(pattern)?.map(item => item.item);
    }
  }

  /* Selected tags come as parameters and are defined to be filtered. */
  onSelectedTagsChange(selectedTags) {
    this.selectedTags = selectedTags;
    this.tagFilterChange.emit(selectedTags);
  }

  /* Page index comes as a parameter and is defined to be paginated */
  onPageIndexChange(pageIndex: number) {
    this.paginationConfig.pageIndex = pageIndex;
    this.pageIndexChange.emit(pageIndex);
  }

  onImageButtonClick(imageButtonData) {
    this.imageButtonClick.emit({ imageButtonData });
  }

  onAvatarButtonClick(avatarButtonData) {
    this.avatarButtonClick.emit({ avatarButtonData });
  }
  onMenuItemClick(menuItem) {
    this.menuItemClick.emit(menuItem)
  }

  onTopButtonsClick(buttons) {
    this.topButtonsClick.emit(buttons);
  }

}
