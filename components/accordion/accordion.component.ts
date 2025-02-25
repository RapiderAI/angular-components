import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AccordionCollapseIconPosition, AccordionPanel } from '@rapider/angular-components/core/accordion';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig,
  computeBorderStyles
} from '@rapider/angular-components/core/style';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';

@Component({
  selector: 'rappider-accordion',
  standalone: true,
  imports: [
    CommonModule,
    NzCollapseModule,
    RappiderTextComponent,
    RappiderHeadingComponent
  ],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class RappiderAccordionComponent implements OnInit {
  @Input() panels: AccordionPanel[];
  @Input() bordered: boolean;
  @Input() collapseIconPosition: AccordionCollapseIconPosition;
  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;

  borderStyles: any = {};

  ngOnInit(): void {
    this.setBorderStyles();
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }

}
