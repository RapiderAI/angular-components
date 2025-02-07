import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { Address } from '@rapider/angular-components/core/address-card';

@Component({
  selector: 'rappider-address-card',
  templateUrl: './address-card.component.html',
  imports:[
    CommonModule,
    NzCardModule,
    RappiderTextComponent,
    RappiderHeadingComponent,
    RappiderIconComponent,
    RappiderButtonComponent,
    NzPopconfirmModule
  ],
  standalone: true,
  styleUrls: ['./address-card.component.scss']
})
export class RappiderAddressCardComponent {

  @Input() title: HeadingComponentConfig;
  @Input() subtitle: HeadingComponentConfig;
  @Input() addresses: Address[];
  @Input() buttons: ButtonComponentConfig[];

  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();

  onClickButton(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }

}
