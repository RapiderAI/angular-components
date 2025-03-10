import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rappider-crud-model-display',
  templateUrl: './crud-model-display.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./crud-model-display.component.scss'],
})
export class RappiderCRUDModelDisplayComponent {

  @Input() data: any;
  @Input() formConfig: any;
  @Input() relations: any[];

}
