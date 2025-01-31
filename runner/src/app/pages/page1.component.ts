import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RappiderDrawerComponent } from '@rapider/angular-components/drawer';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderDrawerComponent,
  ],
  selector: 'app-page',
  template: `

    <rappider-drawer title="menu" [closable]="true">helo</rappider-drawer>


  <div style="border: 1px solid black; padding: 30px; margin: 5px;">


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