import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CardButtonActionResponse } from '@rapider/angular-components/core/card';
import { CardButton } from '@rapider/angular-components/core/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardListItem } from './utils/card-list-item.interface';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { FormatDateModule } from '@rapider/angular-components/core/services';


@Component({
  selector: 'rappider-card-list',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule,
    TranslateModule,
    FormatDateModule,
    RappiderHeadingComponent
  ],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class RappiderCardListComponent {

  /* Input for the data that will display in Card */
  @Input() data: CardListItem[];
  /* card loading state */
  @Input() loading: boolean;

  @Output() cardClick: EventEmitter<CardListItem> = new EventEmitter();
  @Output() buttonClick: EventEmitter<CardButtonActionResponse> = new EventEmitter();

  /* card click */
  onCardClick(cardListItem: CardListItem) {
    this.cardClick.emit(cardListItem);
  }

  /* button click */
  onButtonClick(button: CardButton) {
    const response: CardButtonActionResponse = {
      actionKey: button.actionKey,
      actionType: button.actionType,
      actionData: button.actionData
    };
    this.buttonClick.emit(response);
  }

}
