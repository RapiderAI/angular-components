import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { RappiderHeadingComponent, HeadingComponentConfig } from '@rapider/angular-components/heading';
import { RappiderImageComponent } from '@rapider/angular-components/image';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'rappider-image-label',
  standalone: true,
  imports: [RappiderImageComponent, RappiderHeadingComponent, RouterModule, CommonModule],
  templateUrl: './image-label.component.html',
  styleUrls: ['./image-label.component.scss']
})
export class RappiderImageLabelComponent {
  @Input() image: ImageComponentConfig;
  @Input() label: HeadingComponentConfig;
  @Input() redirectUrl: string;
}
