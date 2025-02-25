import { Component, Input } from '@angular/core';
import { ProgressStatus, ProgressType, ProgressSize } from '@rapider/angular-components/core/progress';
import { ColorConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'rappider-progress',
  standalone: true,
  imports: [NzProgressModule, CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class RappiderProgressComponent {
  @Input() percent: number;
  @Input() showInfo: boolean;
  @Input() status: ProgressStatus;
  @Input() type: ProgressType;
  @Input() successPercent: number;
  @Input() size: ProgressSize;
  @Input() width: number;
  @Input() strokeWidth: number;
  @Input() isSuccessPercentVisible: boolean;
  @Input() colorSettings: ColorConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() showText: boolean;
  @Input() innerText: string;
}