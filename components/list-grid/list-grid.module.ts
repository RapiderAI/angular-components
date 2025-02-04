import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/* declaration component */
import { RappiderListGridComponent } from './list-grid.component';

/* services */
import { RappiderPaginationService } from '../../services/pagination/pagination.service';
import { TemplatingService } from '../../services/templating/templating.service';

/* modules */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GridFilterComponent } from './components/grid-filter/grid-filter.component';
import { RappiderRateDisplayModule } from '../rate-display/rate-display.module';
import { RappiderDropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';
import { RappiderTextboxModule } from '../textbox/textbox.module';
import { RappiderCheckboxModule } from '../checkbox/checkbox.module';
import { RappiderNumberInputModule } from '../number-input/number-input.module';
import { RappiderDatePickerModule } from '../date-picker/date-picker.module';
import { RappiderHeadingModule } from '../heading/heading.module';
import { RappiderIconModule } from '../icon/icon.module';
import { RappiderButtonModule } from '../button/button.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { RappiderSelectModule } from '../select/select.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { RappiderDividerModule } from '../divider/divider.module';
import { RappiderRadioGroupModule } from '../radio-group/radio-group.module';
import { RappiderInputTemplateModule } from '../input-template/input-template.module';
import { RappiderTagListModule } from '../tag-list/tag-list.module';

@NgModule({
  declarations: [
    RappiderListGridComponent,
    GridFilterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DragDropModule,
    RouterModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule,
    NzDropDownModule,
    NzDividerModule,
    RappiderRateDisplayModule,
    NzIconModule,
    RappiderDropdownMenuModule,
    RappiderTextboxModule,
    RappiderCheckboxModule,
    RappiderNumberInputModule,
    RappiderDatePickerModule,
    RappiderHeadingModule,
    RappiderIconModule,
    RappiderButtonModule,
    RappiderSelectModule,
    NzCollapseModule,
    RappiderDividerModule,
    RappiderRadioGroupModule,
    RappiderInputTemplateModule,
    RappiderTagListModule
  ],
  providers: [
    RappiderPaginationService,
    TemplatingService
  ],
  exports: [
    RappiderListGridComponent
  ]
})
export class RappiderListGridModule { }
