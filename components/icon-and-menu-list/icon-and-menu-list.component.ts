import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RappiderIconAndMenuListItemComponent } from './icon-and-menu-list-item/icon-and-menu-list-item.component';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { ButtonActionBehavior } from '@rapider/angular-components/core/button';
import { IconAndMenuListItemComponentConfig } from './utils/icon-and-menu-list-item-component-config.interface';

@Component({
  selector: 'rappider-icon-and-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    RappiderButtonComponent,
    RappiderIconAndMenuListItemComponent,
  ],
  templateUrl: './icon-and-menu-list.component.html',
  styleUrls: ['./icon-and-menu-list.component.scss']
})
export class RappiderIconAndMenuListComponent {

  /* data to emit */
  @Input() data: any;

  /* list items */
  @Input() items: IconAndMenuListItemComponentConfig[];

  /* card title */
  @Input() title: string;

  /* button */
  @Input() button: ButtonComponentConfig;

  /* action behavior */
  @Input() buttonActionBehavior: ButtonActionBehavior;

  /* redirect url of the button */
  @Input() buttonRedirectUrl: string;

  /* button click event emitter */
  @Output() buttonClick = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  onButtonClick() {
    switch (this.buttonActionBehavior) {
      case ButtonActionBehavior.Route:
        if (this.buttonRedirectUrl) {
          this.router.navigateByUrl(this.buttonRedirectUrl);
        }
        break;
      case ButtonActionBehavior.Emit:
      default:
        this.buttonClick.emit(this.data);
        break;
    }
  }
}
