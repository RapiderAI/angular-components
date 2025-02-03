import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { ButtonListDirection } from '@rapider/angular-components/core/button-list';

@Component({
  selector: 'rappider-button-list',
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
  ],
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss']
})
export class RappiderButtonListComponent {
  @Input() buttons: ButtonComponentConfig[];
  /* sorting direction, horizontal or vertical */
  @Input() direction: ButtonListDirection;
  /* space between buttons */
  @Input() gap: string;

  Direction = ButtonListDirection;

  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();

  onButtonClick(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }
}
