import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatIconModule } from '@angular/material/icon';
import { IconType, FontAwesomeIconAnimation, NgZorroIconTheme, FontAwesomeIconType } from '@rapider/angular-components/core/icon';

@Component({
  selector: 'rpd-icon',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    MatIconModule,
  ],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

  /* icon name */
  name = input.required<string>();
  /* icon library */
  type = input<IconType | string | undefined>(IconType.FontAwesome);
  /* theme for selected icon library */
  theme = input<NgZorroIconTheme | undefined>('fill');
  /* icon color */
  color = input<string | undefined>();
  /* icon font size */
  size = input<string | undefined>();
  secondColor = input<string | undefined>();
  animation = input<FontAwesomeIconAnimation | undefined>(FontAwesomeIconAnimation.None);
  style = input<FontAwesomeIconType | undefined>(FontAwesomeIconType.Regular);
  isClickable = input<boolean | undefined>(false);

  iconClick = output<void>();

  protected readonly IconType = IconType;

  constructor() { }

  onIconClick() {
    if (this.isClickable()) {
      this.iconClick.emit();
    }
  }

}
