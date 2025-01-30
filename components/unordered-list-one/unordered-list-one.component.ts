import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderTextComponent } from '@rapider/angular-components/text';

@Component({
  selector: 'rappider-unordered-list-one',
  standalone: true,
  imports: [
    CommonModule,
    RappiderIconComponent,
    RappiderHeadingComponent,
    RappiderTextComponent,
  ],
  templateUrl: './unordered-list-one.component.html',
  styleUrls: ['./unordered-list-one.component.scss']
})
export class RappiderUnorderedListOneComponent {

  @Input() titleIcon: IconComponentConfig;
  @Input() title: HeadingComponentConfig;
  @Input() list: string[];

}
