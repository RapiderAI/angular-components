import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'rappider-rate-display',
  standalone: true,
  imports: [
    FormsModule,
    NzRateModule,
  ],
  templateUrl: './rate-display.component.html',
  styleUrls: ['./rate-display.component.scss']
})
export class RappiderRateDisplayComponent {
  @Input() rate: number;
}
