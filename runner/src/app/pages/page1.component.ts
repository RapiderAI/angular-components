import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RappiderDrawerComponent } from '@rapider/angular-components/drawer';
import { RappiderClickToDialComponent } from '@rapider/angular-components/click-to-dial';
import { RappiderStripeComponent } from '@rapider/angular-components/stripe/stripe.component';
import { NgxStripeModule } from 'ngx-stripe';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderDrawerComponent,
    RappiderClickToDialComponent,
    RappiderStripeComponent
    ],
  selector: 'app-page',
  template: `

    <rappider-drawer title="menu" [closable]="true">helo</rappider-drawer>


  <div style="border: 1px solid black; padding: 30px; margin: 5px;">
    <!-- <rappider-click-to-dial [status]="true" [value]="'3434343434'" [showMaskTyped]="true" [mask]="'000-000-0000'"></rappider-click-to-dial> -->
  <rappider-stripe></rappider-stripe>
  </div>
  `,
})

export class Page1Component {

  menu = {
    mode: 'horizontal',
    items: [
      {
        label: 'label',
        showLabel: true,
        key: 'key1',
      }
    ]
  }

}