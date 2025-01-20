import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { SpacingConfig } from '@rapider/angular-components/core/style';
import { BadgeStatus } from '@rapider/angular-components/core/badge/badge-status.enum';
import { TextMode } from '@rapider/angular-components/core/text/text-mode.enum';

@Component({
  selector: 'rappider-calendar',
  imports: [
    CommonModule,
    NzBadgeComponent,
  ],
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  count = input<number>();
  color = input<string>();
  dot = input<boolean>(false);
  showDot = input<boolean>(true);
  overflowCount = input<number>(99);
  showZero = input<boolean>();
  status = input<BadgeStatus, BadgeStatus | string>(undefined, {
    transform: (initialValue) => {
      return <BadgeStatus>initialValue;
    }
  });
  title = input<string>();
  text = input<string | undefined>();
  offset = input<[number, number]>();
  paddingSettings = input<SpacingConfig>();
  marginSettings = input<SpacingConfig>();

  protected TextMode = TextMode;
}
