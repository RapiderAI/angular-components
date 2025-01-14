import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { ColorConfig } from '@rapider/angular-components/core/style';

@Component({
  selector: 'rappider-paragraph',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class RappiderParagraphComponent {
  /* paragraph content */
  @Input() content: string;
  @Input() typography: TypographyConfig;
  @Input() colorSettings: ColorConfig;
}
