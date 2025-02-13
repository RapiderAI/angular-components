import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToolbarConfig } from '@rapider/angular-components/core/toolbar';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rappider-toolbar',
  templateUrl: './toolbar.component.html',
  imports:[
    CommonModule,
    RappiderButtonComponent,
    TranslateModule
  ],
  standalone: true,
  styleUrls: ['./toolbar.component.scss']
})
export class RappiderToolbarComponent {
  @Input() displayBackButton = true;

  toolbarConfig = ToolbarConfig;

  constructor(private location: Location) { }

  onToolbarBackButtonClick() {
    this.location.back();
  }
}
