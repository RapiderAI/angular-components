import { Component, computed, input } from '@angular/core';
import { IconComponent } from '@rapider/angular-components/icon';
import { IconComponentConfig } from '@rapider/angular-components/core/icon';
import { AvatarShape, AvatarSize } from '@rapider/angular-components/core/avatar';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig,
  computeBorderStyles
} from '@rapider/angular-components/core/style';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzShapeSCType, NzSizeLDSType } from 'ng-zorro-antd/core/types';


@Component({
  selector: 'rpd-avatar',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzTooltipDirective,
    IconComponent,
  ],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  /* avatar text */
  text = input<string>();

  /**
   * iconName is deprecated use icon input instead
   *
   * @type {string}
   * @memberof AvatarComponent
   */
  iconName = input<string>();
  /* displayed icon's name */
  icon = input<IconComponentConfig>();
  /* avatar shape */
  shape = input<NzShapeSCType, AvatarShape>(AvatarShape.Square, {
    transform: (initialValue => {
      if (initialValue) {
        return <NzShapeSCType>initialValue;
      } else {
        return <NzShapeSCType>AvatarShape.Square;
      }
    })
  });
  /* avatar image url */
  imageUrl = input<string>();
  /* alternate text */
  altText = input<string>();
  /* css style eg. backgroundColor */
  cssStyle = input<string>();
  /* avatar size */
  size = input<NzSizeLDSType, AvatarSize | string>(AvatarSize.Default, {
    transform: (initialValue => {
      if (initialValue) {
        return <NzSizeLDSType>initialValue;
      }
      return <NzSizeLDSType>AvatarSize.Default;
    })
  });
  /* tooltip text */
  tooltipText = input<string>();
  /* description */
  description = input<string>();

  /* styles */
  borderSettings = input<BorderConfig>();
  sizeSettings = input<SizeConfig>();
  colorSettings = input<ColorConfig>();
  boxShadowSettings = input<BoxShadowConfig>();
  paddingSettings = input<SpacingConfig>();
  marginSettings = input<SpacingConfig>();

  /* calculate border styles */
  borderStyles = computed(() => {
    return computeBorderStyles({
      border: this.borderSettings()?.border,
      borderRadius: this.borderSettings()?.borderRadius,
    });
  });

}
