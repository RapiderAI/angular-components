import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';
import { IconType } from '@rapider/angular-components/core/icon';
import { RappiderButtonComponent } from '../button';
import { ButtonType } from '../core/button/button-type.enum';

@Component({
  selector: 'rappider-email-viewer',
  standalone: true,
  imports: [
    RappiderIconComponent,
    RappiderButtonComponent
  ],
  templateUrl: './email-viewer.component.html',
  styleUrls: ['./email-viewer.component.scss']
})
export class RappiderEmailViewerComponent implements OnInit, OnChanges {
  @Input() email: string;
  @Input() label: string;
  @Input() icon: IconComponentConfig;
  @Input() showIcon: boolean = false;
  @Input() labelVisibility: boolean = false;

  ButtonType = ButtonType;

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (this.showIcon == null) {
      this.showIcon = false;
    }

    if (this.showIcon) {
      if (!this.icon?.name) {
        this.icon = {
          name: 'fa-solid fa-envelope',
          type: IconType.FontAwesome
        };
      }
    } else {
      this.icon = null;
    }

    if (this.labelVisibility == null) {
      this.labelVisibility = true;
    }
  }

  onMailToClick() {
    if (this.email) {
      window.open(`mailto:${this.email}`, '_self');
    }
  }
}
