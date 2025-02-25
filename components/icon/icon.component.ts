import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatIconModule } from '@angular/material/icon';
import { IconType, FontAwesomeIconAnimation, NgZorroIconTheme, FontAwesomeIconType } from '@rapider/angular-components/core/icon';

@Component({
  selector: 'rappider-icon',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    MatIconModule,
  ],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RappiderIconComponent implements OnInit, OnChanges {

  /* icon name */
  @Input() name: string;
  /* icon library */
  @Input() type: IconType;
  /* theme for selected icon library */
  @Input() theme: NgZorroIconTheme;
  /* icon color */
  @Input() color: string;
  /* icon font size */
  @Input() size: string;
  @Input() secondColor: string;
  @Input() animation: FontAwesomeIconAnimation;
  @Input() style: FontAwesomeIconType;
  @Input() isClickable: boolean;

  @Output() iconClick = new EventEmitter();

  IconType = IconType;

  constructor() { }

  ngOnInit(): void {
    this.initDefault();
  }

  ngOnChanges(): void {
    this.initDefault();
  }

  initDefault() {
    if (!this.type) {
      this.type = IconType.FontAwesome;
    }
  }

  onIconClick() {
    if (this.isClickable) {
      this.iconClick.emit();
    }
  }
}
