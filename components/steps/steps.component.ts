import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { StepsDirection, StepsSize, StepsType, StepStatus, StepsLabelPlacement } from '@rapider/angular-components/core/steps';
import { Steps } from '@rapider/angular-components/steps';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { CommonModule } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';


@Component({
  selector: 'rappider-steps',
  standalone: true,
  imports: [RappiderIconComponent, CommonModule, NzStepsModule],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class RappiderStepsComponent implements OnInit, OnChanges {
  @Input() steps: Steps[];
  @Input() stepsType: StepsType;
  @Input() current: number;
  @Input() stepsDirection: StepsDirection;
  @Input() labelPlacement: StepsLabelPlacement;
  @Input() progressDot: boolean;
  @Input() stepsSize: StepsSize;
  @Input() stepsStatus: StepStatus;
  @Input() startIndex: number;

  /* OUTPUTS */
  @Output() indexChange = new EventEmitter<number>();
  @Output() currentChange = new EventEmitter<number>();

  ngOnInit() {
    this.initDefaults();
  }

  ngOnChanges() {
    this.initDefaults();
  }

  initDefaults() {
    if (this.stepsType == null) {
      this.stepsType = StepsType.Default;
    }
    if (this.current == null) {
      this.current = 0;
    }
    if (this.stepsDirection == null) {
      this.stepsDirection = StepsDirection.Horizontal;
    }
    if (this.labelPlacement == null) {
      this.labelPlacement = StepsLabelPlacement.Horizontal;
    }
    if (this.progressDot == null) {
      this.progressDot = false;
    }
    if (this.stepsSize == null) {
      this.stepsSize = StepsSize.Default;
    }
    if (this.stepsStatus == null) {
      this.stepsStatus = StepStatus.Process
    }
    if (this.startIndex == null) {
      this.startIndex = 0;
    }
  }

  onStepIndexChange(index: number) {
    this.indexChange.emit(index);
  }

  onCurrentChange(index: number) {
    this.current = index;
    this.currentChange.emit(index);
  }

}
