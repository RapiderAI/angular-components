import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RappiderPaginationService {


  DEFAULT_PAGE_SIZE = 10;

  /**
   * gets skipped size by page size and page number.
   *
   * @memberof RappiderPaginationService
   */
  getSkippedSizeByPagination(pageNumber = 1, pageSize = this.DEFAULT_PAGE_SIZE) {
    return (pageNumber - 1) * pageSize;
  }

  getTotalPageNumber(totalCount: number, pageSize = this.DEFAULT_PAGE_SIZE) {
    return Math.ceil(totalCount / pageSize);
  }

}
