import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreadcrumbOption } from '@rapider/angular-components/core/breadcrumb';


@Component({
  selector: 'rappider-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    TranslateModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class RappiderBreadcrumbComponent {

  @Input() options: BreadcrumbOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() cssStyle: any;

  @Output() optionClick = new EventEmitter<BreadcrumbOption>();

  constructor(
    public router: Router
    // eslint-disable-next-line no-empty-function
  ) { }

  onBreadcrumbOptionClick(option: BreadcrumbOption) {
    /* emit clicked breadcrumb */
    this.emitBreadcrumbOption(option);
    /* redirect if specified */
    if (option.redirectUrl) {
      this.router.navigate([option.redirectUrl], { queryParams: option?.queryParams });
    }
  }

  emitBreadcrumbOption(breadcrumbOption: BreadcrumbOption) {
    this.optionClick.emit(breadcrumbOption);
  }

}