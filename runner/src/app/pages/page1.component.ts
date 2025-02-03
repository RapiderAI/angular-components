import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RappiderDrawerComponent } from '@rapider/angular-components/drawer';
import { RappiderAddressFormComponent } from '@rapider/angular-components/address-form';
import { AddressFormData } from '@rapider/angular-components/core/address-form';
import { ButtonType } from '@rapider/angular-components/core/button';
import { ButtonComponentConfig } from '@rapider/angular-components/button';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderDrawerComponent,
    RappiderAddressFormComponent,
  ],
  selector: 'app-page',
  template: `

    <rappider-drawer title="menu" [closable]="true">helo</rappider-drawer>


  <div style="border: 1px solid black; padding: 30px; margin: 5px;">

    <rappider-address-form [data]="addressFormData" [submitButton]="submitButton"></rappider-address-form>


  </div>
  `,
})

export class Page1Component {

  addressFormData: AddressFormData = {

    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'

  };

  submitButton: ButtonComponentConfig = {
    text: 'Submit',
    type: ButtonType.Default,
  };

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