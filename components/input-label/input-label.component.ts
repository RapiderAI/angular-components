import { Component, Input } from '@angular/core';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { IconComponentConfig, RappiderIconModule } from '@rapider/angular-components/icon';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@Component({
  selector: 'rappider-input-label',
  imports: [
    CommonModule,
    TranslateModule,
    NzToolTipModule,
    RappiderIconModule
  ],
  standalone: true,
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss']
})
export class RappiderInputLabelComponent {

  @Input() title: string;
  @Input() iconTooltipTitle: string;
  @Input() typography: TypographyConfig;
  @Input() colorSettings: ColorConfig;
  @Input() icon: IconComponentConfig;
  @Input() description: string;
}
