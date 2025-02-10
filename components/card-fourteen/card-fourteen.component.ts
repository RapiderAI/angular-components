import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { RappiderHtmlViewerComponent } from '@rapider/angular-components/html-viewer';
import { IconTextComponentConfig, RappiderIconTextComponent } from '@rapider/angular-components/icon-text';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';

@Component({
  selector: 'rappider-card-fourteen',
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeadingComponent,
    RappiderHtmlViewerComponent,
    RappiderIconTextComponent,
    RappiderIconComponent
  ],
  templateUrl: './card-fourteen.component.html',
  styleUrls: ['./card-fourteen.component.scss']
})
export class RappiderCardFourteenComponent {
  @Input() additionalSubtitleIcon: IconComponentConfig;
  @Input() additionalSubtitle: HeadingComponentConfig;
  @Input() title: HeadingComponentConfig;
  @Input() subtitle: HeadingComponentConfig;
  @Input() iconTextItems: IconTextComponentConfig;
  @Input() htmlContent: string;

}
