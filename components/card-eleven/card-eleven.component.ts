import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderBadgeComponent } from '@rapider/angular-components/badge';
import { RappiderParagraphComponent } from '@rapider/angular-components/paragraph';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { CardElevenItem } from '@rapider/angular-components/core/card-eleven';


@Component({
  selector: 'rappider-card-eleven',
  standalone: true,
  imports: [
    CommonModule,
    RappiderParagraphComponent,
    RappiderTextComponent,
    RappiderBadgeComponent
  ],
  templateUrl: './card-eleven.component.html',
  styleUrls: ['./card-eleven.component.scss']
})
export class RappiderCardElevenComponent {

  @Input() additionalContent: RappiderParagraphComponent;
  @Input() contentItems: CardElevenItem[];
}
