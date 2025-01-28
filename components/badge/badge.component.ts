import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { RappiderHeadingModule } from '@rapider/angular-components/heading/heading.module';
import { RappiderTextModule } from '@rapider/angular-components/text/text.module'
import { TextComponentConfig } from '@rapider/angular-components/text';
import { SpacingConfig } from '@rapider/angular-components/core/style';
import { BadgeStatus } from '@rapider/angular-components/core/badge';

@Component({
  selector: 'rappider-badge',
  imports: [
    CommonModule,
    NzBadgeModule,
    RappiderHeadingModule,
    RappiderTextModule
  ],
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class RappiderBadgeComponent {
  @Input() count: number;
  @Input() color: string;
  @Input() dot: boolean;
  @Input() showDot: boolean;
  @Input() overflowCount: number;
  @Input() showZero: boolean;
  @Input() status: BadgeStatus;
  @Input() title: string;
  @Input() text: TextComponentConfig;
  @Input() offset: [number, number];
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
}
