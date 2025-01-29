import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { IconComponentConfig, RappiderIconModule } from '@rapider/angular-components/icon';

@Component({
  selector: 'rappider-statistic',
  templateUrl: './statistic.component.html',
  imports: [
    CommonModule,
    NzStatisticModule,
    RappiderIconModule
  ],
  standalone: true,
  styleUrls: ['./statistic.component.scss']
})
export class RappiderStatisticComponent {

  /* statistic title */
  @Input() title: string;
  /* Target time in timestamp form */
  @Input() value: string | number;
  /* prefix icon */
  @Input() icon: IconComponentConfig;
  /* suffix of value */
  @Input() suffix: string;

}
