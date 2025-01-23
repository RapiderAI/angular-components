import { Component, Input, Output, EventEmitter, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginationSize } from '@rapider/angular-components/core/pagination/pagination-size.enum';


@Component({
  selector: 'rappider-pagination',
  standalone: true,
  imports: [
    CommonModule,
    NzPaginationModule
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class RappiderPaginationComponent implements OnInit {

  // current page number，double binding
  @Input() pageIndex: number;
  // total number of data items
  @Input() total: number;
  // disable pagination
  @Input() disabled: boolean;
  // specify the size of nz-pagination, can be set to small
  @Input() size: PaginationSize;
  // number of data items per page, double binding
  @Input() pageSize = 10;
  // whether to use simple mode
  @Input() isSimple: boolean;
  @Input() color: string;
  @Input() gap: string;
  @Input() showTotal: boolean;

  // current page number change callback
  @Output() pageSizeChange = new EventEmitter<number>();
  // current page number change callback
  @Output() pageIndexChange = new EventEmitter<number>();

  @HostBinding('style.--pagination-color') paginationColor;
  @HostBinding('style.--pagination-gap') paginationGap;

  ngOnInit(): void {
    if (this.color || this.gap) {
      this.paginationColor = this.color;
      this.paginationGap = this.gap;
    }
    if (!this.color) {
      this.paginationColor = 'var(--primary-color)';
    }
  }

  onPageSizeChange(pageSize: number) {
    this.pageSizeChange.emit(pageSize);
  }

  onPageIndexChange(pageSize: number) {
    this.pageIndexChange.emit(pageSize);
  }

}
