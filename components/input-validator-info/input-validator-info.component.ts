import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderDataOrderService } from '@rapider/angular-components/services';
import { PatternInformation } from './utils';


@Component({
  selector: 'rappider-input-validator-info',
  templateUrl: './input-validator-info.component.html',
  imports:[
    CommonModule,
    TranslateModule
  ],
  standalone: true,
  providers:[
    RappiderDataOrderService
  ],
  styleUrls: ['./input-validator-info.component.scss']
})
export class RappiderInputValidatorInfoComponent implements OnChanges {

  @Input() data: any;
  @Input() patternInfos: PatternInformation[];

  /**
   * processed values by regex of "patterns" input variable
   *
   * @type {boolean[]}
   * @memberof RappiderInputValidatorInfoComponent
   */
  patternStatuses: boolean[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['patternInfos']) {
      this.checkDataBySpecifiedPatterns();
    }
  }  

  checkDataBySpecifiedPatterns() {
    this.patternStatuses = this.patternInfos?.map(patternInfo => patternInfo.pattern.test(this.data));
  }

}
