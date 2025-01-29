import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { ColorConfig } from '@rapider/angular-components/core/style';

@Component({
  selector: 'rappider-input-error',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class RappiderInputErrorComponent {

  @Input() errors: string[];
  @Input() typography: TypographyConfig;
  @Input() colorSettings: ColorConfig;

}
