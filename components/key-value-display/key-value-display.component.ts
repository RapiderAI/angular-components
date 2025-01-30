import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RappiderTextComponent } from '@rapider/angular-components/text';

@Component({
  selector: 'rappider-key-value-display',
  standalone: true,
  imports: [
    CommonModule,
    RappiderTextComponent,
  ],
  templateUrl: './key-value-display.component.html',
  styleUrls: ['./key-value-display.component.scss']
})
export class RappiderKeyValueDisplayComponent {

  @Input() items: KeyValue<string, any>[];

}
