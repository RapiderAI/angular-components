import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { ProgressComponentConfig, RappiderProgressComponent } from '@rapider/angular-components/progress';
import { RappiderRateDisplayComponent } from '@rapider/angular-components/rate-display';





@Component({
  selector: 'rappider-review-results',
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeadingComponent,
    RappiderRateDisplayComponent,
    RappiderProgressComponent
  ],
  templateUrl: './review-results.component.html',
  styleUrls: ['./review-results.component.scss'],
})
export class RappiderReviewResultsComponent {

  /* heading config */
  @Input() title: HeadingComponentConfig;
  /* progress bars */
  @Input() progresses: ProgressComponentConfig[];
  /* progress rate */
  @Input() rate: number;
}

