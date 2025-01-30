import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RappiderUnorderedListOneComponent,
  UnorderedListOneComponentConfig,
} from '@rapider/angular-components/unordered-list-one';

@Component({
  selector: 'rappider-unordered-list-one-array',
  standalone: true,
  imports: [
    CommonModule,
    RappiderUnorderedListOneComponent
  ],
  templateUrl: './unordered-list-one-array.component.html',
  styleUrls: ['./unordered-list-one-array.component.scss']
})
export class RappiderUnorderedListOneArrayComponent {

  @Input() items: UnorderedListOneComponentConfig[];
}
