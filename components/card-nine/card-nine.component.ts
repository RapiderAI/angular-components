import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { CardNineItem } from '@rapider/angular-components/core/card-nine';

@Component({
  selector: 'rappider-card-nine',
  standalone: true,
  imports: [
    CommonModule,
    RappiderIconComponent,
    RappiderTextComponent
  ],
  templateUrl: './card-nine.component.html',
  styleUrls: ['./card-nine.component.scss']
})
export class RappiderCardNineComponent {

  @Input() items: CardNineItem[];

}
