import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderConfig, SizeConfig, BoxShadowConfig, SpacingConfig, computeBorderStyles } from '@rapider/angular-components/core/style';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { TagType } from '@rapider/angular-components/core/tag';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { TooltipPlacement } from '@rapider/angular-components/core/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'rappider-tag',
  standalone: true,
  imports: [
    CommonModule,
    RappiderIconComponent,
    RappiderTextComponent,
    NzTagModule,
    NzToolTipModule,
  ],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class RappiderTagComponent implements OnInit {

  /* Mode of tag */
  @Input() mode = TagType.Default;
  /* Checked status of Tag, double binding, only works when nzMode="checkable" */
  @Input() checked = false;
  /* Color of the Tag */
  @Input() color: string;
  /* text */
  @Input() text: TextComponentConfig;
  @Input() icon: IconComponentConfig;

  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() tooltipText?: string;
  @Input() tooltipPlacement?: TooltipPlacement;

  /* Checked status change call back, only works when nzMode="checkable" */
  @Output() checkedChange = new EventEmitter();
  /* 	Callback executed when tag is closed, only works when nzMode="closable" */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter();

  borderStyles: any = {};

  ngOnInit(): void {
    this.setBorderStyles();
  }

  onCheckChange() {
    this.checkedChange.emit();
  }

  onTagClose() {
    this.close.emit();
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }

}
