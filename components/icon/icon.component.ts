import { ChangeDetectionStrategy, Component, input, OnChanges, OnInit, output, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatIconModule } from '@angular/material/icon';
import { IconType, FontAwesomeIconAnimation, NgZorroIconTheme, FontAwesomeIconType } from 'rpd-components/core/icon';

@Component({
  selector: 'rpd-icon',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    MatIconModule
  ],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit, OnChanges {

  /* icon name */
  name = input.required<string>();
  /* icon library */
  type = input<IconType | undefined>(IconType.FontAwesome);
  typeSignal = signal(this.type());
  /* theme for selected icon library */
  theme = input<NgZorroIconTheme | undefined>(NgZorroIconTheme.Fill);
  /* icon color */
  color = input<string | undefined>();
  /* icon font size */
  size = input<string | undefined>();
  secondColor = input<string | undefined>();
  animation = input<FontAwesomeIconAnimation | undefined>(FontAwesomeIconAnimation.None);
  style = input<FontAwesomeIconType | undefined>(FontAwesomeIconType.Regular);
  isClickable = input<boolean | undefined>(false);

  iconClick = output<void>();

  IconType = IconType;

  constructor() { }

  ngOnInit(): void {
    this.initDefault();
  }

  ngOnChanges(): void {
    this.initDefault();
  }

  initDefault() {
    if (!this.type()) {
      this.typeSignal.set(IconType.FontAwesome);
    }
  }

  onIconClick() {
    if (this.isClickable()) {
      this.iconClick.emit();
    }
  }

}
