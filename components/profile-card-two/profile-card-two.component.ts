import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';
import { ImageComponentConfig, RappiderImageComponent } from '@rapider/angular-components/image';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { CardStatus } from '@rapider/angular-components/profile-card-two/utils';

@Component({
  selector: 'rappider-profile-card-two',
  templateUrl: './profile-card-two.component.html',
  imports:[
    CommonModule,
    RappiderIconComponent,
    RappiderImageComponent,
    RappiderHeadingComponent,
    NzBadgeComponent
  ],
  standalone: true,
  styleUrls: ['./profile-card-two.component.scss']
})
export class RappiderProfileCardTwoComponent {

  @Input() profilePhoto: ImageComponentConfig;
  @Input() title: HeadingComponentConfig;
  @Input() cardStatus: CardStatus;
  @Input() content: string;
  @Input() icon: IconComponentConfig;
  @Input() iconBadgeCount: number;
}
