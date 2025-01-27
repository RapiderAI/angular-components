import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderHeadingComponent, HeadingComponentConfig } from '@rapider/angular-components/heading';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';



@Component({
  selector: 'rappider-panel',
  standalone: true,
  imports: [
    CommonModule,
    RappiderIconComponent,
    RappiderHeadingComponent
  ],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class RappiderPanelComponent {

  /* title */
  @Input() title: HeadingComponentConfig;
  /* content */
  @Input() content: string;
  /* icon for title area  */
  @Input() icon: IconComponentConfig;
  /* background color  */
  @Input() backgroundColor;

}
