import { Component, Input } from '@angular/core';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { CommonModule } from '@angular/common';
import { HeadingType } from '@rapider/angular-components/core/heading';

@Component({
  selector: 'rappider-heading',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class RappiderHeadingComponent {

  /* heading type  */
  @Input() type: HeadingType;
  /* content  */
  @Input() content: string;
  @Input() typography: TypographyConfig;
  @Input() colorSettings: ColorConfig;
  @Input() className: string;

  HeadingType = HeadingType;
}
