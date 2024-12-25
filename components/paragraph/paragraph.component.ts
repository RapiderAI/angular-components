import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyConfig } from 'rpd-components/core/typography';
import { ColorConfig } from 'rpd-components/core/style';

@Component({
  selector: 'rpd-paragraph',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent {
  content = input<string>();
  typography = input<TypographyConfig>();
  colorSettings = input<ColorConfig>();
}