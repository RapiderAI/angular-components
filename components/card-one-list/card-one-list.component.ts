import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardOneComponentConfig, RappiderCardOneComponent } from '@rapider/angular-components/card-one';
import { RappiderPaginationComponent } from '@rapider/angular-components/pagination';
import { CardOneListButtonClickOutput, CardOneListCardClickOutput, ItemPerRow } from '@rapider/angular-components/core/card-one-list';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { CardDisplayMode, CardOneButtonOutput } from '@rapider/angular-components/core/card-one';



@Component({
  selector: 'rappider-card-one-list',
  standalone: true,
  imports: [
    CommonModule,
    RappiderCardOneComponent,
    RappiderPaginationComponent
  ],
  templateUrl: './card-one-list.component.html',
  styleUrls: ['./card-one-list.component.scss']
})
export class RappiderCardOneListComponent implements OnInit, OnChanges {

  @Input() items: CardOneComponentConfig[];
  /**
   * specifies column count for per row
   *
   * @type {ItemPerRow}
   * @memberof RappiderCardOneListComponent
   */
  @Input() itemCountPerRow: ItemPerRow;
  @Input() showTitleOnImage: boolean;
  @Input() showDescriptionOnImage: boolean;
  @Input() showPopover: boolean;
  @Input() showPopoverImage: ImageComponentConfig;
  @Input() displayMode: CardDisplayMode;
  /* pagination state */
  @Input() pagination = false;
  /* pagination page index */
  @Input() paginationPageIndex = 1;
  /* page size */
  @Input() pageSize = 10;
  @Input() maxHeight: string;

  @Output() cardClick = new EventEmitter<CardOneListCardClickOutput>();
  @Output() imageButtonClick = new EventEmitter<CardOneListButtonClickOutput>();
  @Output() additionalButtonClick = new EventEmitter();
  @Output() paginationPageIndexChange = new EventEmitter<number>();

  dataToDisplay: CardOneComponentConfig[];


  ngOnInit(): void {
    this.checkPagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagination'] || changes['paginationPageIndex'] || changes['pageSize'] || changes['items']) {
      this.checkPagination();
    }
  }

  checkPagination() {
    if (this.pagination) {
      this.dataToDisplay = this.items?.slice((this.paginationPageIndex - 1) * this.pageSize, this.paginationPageIndex * this.pageSize);
    } else {
      this.dataToDisplay = this.items;
    }
  }

  onCardClick(data: any, item: CardOneComponentConfig) {
    this.cardClick.emit({ data, item });
  }

  onImageButtonClick(cardOneButtonOutput: CardOneButtonOutput, item: CardOneComponentConfig) {
    this.imageButtonClick.emit({ cardOneButtonOutput, item });
  }

  onAdditionalButtonClick(cardOneButtonOutput: CardOneButtonOutput, item: CardOneComponentConfig) {
    this.additionalButtonClick.emit({ cardOneButtonOutput, item });
  }

  calculateColumns() {
    switch (this.itemCountPerRow) {
      case ItemPerRow.One:
        return 'col-12';
      case ItemPerRow.Two:
        return 'col-lg-6 col-md-12';
      case ItemPerRow.Three:
        return 'col-lg-4 col-md-6 col-sm-12';
      case ItemPerRow.Four:
        return 'col-lg-3 col-md-6 col-sm-12';
      case ItemPerRow.Auto:
        return 'col';
      default:
        return 'col';
    }
  }

  /* Page index comes as a parameter and is defined to be paginated */
  onPageIndexChange(pageIndex: number) {
    this.paginationPageIndex = pageIndex;
    this.paginationPageIndexChange.emit(pageIndex);
  }

}
