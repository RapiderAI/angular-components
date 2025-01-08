import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'rpd-rate-display',
  standalone: true,
  imports: [
    FormsModule,
    NzRateModule,
  ],
  templateUrl: './rate-display.component.html',
})
export class RateDisplayComponent {
  rate = input<number>();
}
