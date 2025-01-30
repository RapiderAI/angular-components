import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';


@Component({
  selector: 'rappider-button-group',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    RappiderButtonComponent
  ],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class RappiderButtonGroupComponent {

  @Input() buttons: ButtonComponentConfig[];

  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();

  onButtonClick(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }

}
