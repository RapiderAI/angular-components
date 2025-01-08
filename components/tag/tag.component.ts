import { Component, OnInit, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IconComponent } from '@rapider/angular-components/icon';
import { TextComponent } from '@rapider/angular-components/text';
import { TagType } from '@rapider/angular-components/core/tag';
import { TextComponentConfig } from '@rapider/angular-components/core/text';
import { IconComponentConfig } from '@rapider/angular-components/core/icon';
import { TooltipPlacement } from '@rapider/angular-components/core/button';
import {
  BorderConfig,
  BoxShadowConfig,
  computeBorderStyles,
  SizeConfig,
  SpacingConfig
} from '@rapider/angular-components/core/style';


@Component({
  selector: 'rpd-tag',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    TextComponent,
    NzTagModule,
    NzToolTipModule,
  ],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {

  mode = input<TagType>(TagType.Default);
  /* checked status, only works when nzMode="checkable" */
  checked = input<boolean>(false);
  color = input<string>();
  text = input<TextComponentConfig>();
  icon = input<IconComponentConfig>();
  tooltipPlacement = input<TooltipPlacement | undefined>();
  tooltipText = input<string>();
  /* styles */
  borderSettings = input<BorderConfig>();
  marginSettings = input<SpacingConfig>();
  sizeSettings = input<SizeConfig>();
  paddingSettings = input<SpacingConfig>();
  boxShadowSettings = input<BoxShadowConfig>();

  /* Checked status change call back, only works when nzMode="checkable" */
  checkedChange = output<void>();
  /* Callback executed when tag is closed, only works when nzMode="closable" */
  close = output<void>();

  ngOnInit(): void {
  }

  onCheckChange() {
    this.checkedChange.emit();
  }

  onTagClose() {
    this.close.emit();
  }

  borderStyles = computed(() => {
    return computeBorderStyles({
      border: this.borderSettings()?.border,
      borderRadius: this.borderSettings()?.borderRadius,
    });
  });

}
