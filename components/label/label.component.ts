import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';

@Component({
  selector: 'rappider-label',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class RappiderLabelComponent {
  @Input() content: string;
  @Input() typography: TypographyConfig;
  @Input() colorSettings: ColorConfig;
}
