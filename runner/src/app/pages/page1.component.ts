import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RappiderDrawerComponent } from '@rapider/angular-components/drawer';
import { RappiderClickToDialComponent } from '@rapider/angular-components/click-to-dial';
import { RappiderIconPickerWrapperComponent } from '@rapider/angular-components/icon-picker-wrapper';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderDrawerComponent,
    RappiderIconPickerWrapperComponent
  ],
  selector: 'app-page',
  template: `

    <rappider-drawer title="menu" [closable]="true">helo</rappider-drawer>


  <div style="border: 1px solid black; padding: 30px; margin: 5px;">
    <rappider-icon-picker-wrapper></rappider-icon-picker-wrapper>
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