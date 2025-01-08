import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rpd-select',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  // options = input<>();
}
