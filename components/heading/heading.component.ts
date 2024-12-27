import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { HeadingType } from '@rapider/angular-components/core/heading';

@Component({
  selector: 'rpd-heading',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
  type = input<HeadingType | string>(HeadingType.H1);
  content = input<string>();
  typography = input<TypographyConfig>();
  colorSettings = input<ColorConfig>();
  className = input<string>();

  protected readonly HeadingType = HeadingType;
}
