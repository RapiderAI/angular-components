import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { AvatarShape, AvatarSize } from '@rapider/angular-components/core/avatar';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig, computeBorderStyles } from '@rapider/angular-components/core/style';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'rappider-avatar',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzTooltipDirective,
    RappiderIconComponent,
  ],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class RappiderAvatarComponent implements OnInit {
  /* avatar text */
  @Input() text: string;
  /**
   * iconName is deprecated use icon input instead
   *
   * @type {string}
   * @memberof RappiderAvatarComponent
   */
  @Input() iconName: string;
  /* displayed icon's name */
  @Input() icon: IconComponentConfig;
  /* avatar shape */
  @Input() shape: AvatarShape;
  /* avatar image url */
  @Input() imageUrl: string;
  /* alternate text */
  @Input() altText: string;
  /* css style eg. backgroundColor */
  @Input() cssStyle: string;
  /* avatar size */
  @Input() size: AvatarSize | number;
  /* avatar description */
  @Input() tooltipText?: string;
  @Input() description: string;
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
      border: this.borderSettings?.border,
      borderRadius: this.borderSettings?.borderRadius
    });
  }
}
