import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RappiderTextComponent, TextComponentConfig } from  '@rapider/angular-components/text';
import { DividerOrientation } from '@rapider/angular-components/core/divider/divider-orientation.enum';
import { DividerType } from '@rapider/angular-components/core/divider/divider-type.enum';
import { DividerStyle } from '@rapider/angular-components/core/divider/divider-style.enum';
import { TextMode } from '../core/text/text-mode.enum';

@Component({
  selector: 'rappider-divider',
  standalone: true,
  imports: [
    CommonModule,
    NzDividerModule,
    RappiderTextComponent
  ],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class RappiderDividerComponent implements OnInit {
  @Input() style: DividerStyle;
  @Input() type: DividerType;
  @Input() text: TextComponentConfig;
  @Input() textPlacement: DividerOrientation;
  @Input() dividerWidth: string;
  @Input() dividerColor: string;

  @HostBinding('style.--border-color') borderColor;
  @HostBinding('style.--border-width') borderWidth;

  DividerType = DividerType;
  TextMode = TextMode;

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig() {
    if (this.dividerColor) {
      this.borderColor = this.dividerColor;
    } else {
      this.borderColor = 'var(--primary-border-color)';
    }

    if (this.dividerWidth) {
      this.borderWidth = this.dividerWidth;
    } else {
      this.borderWidth = 'var(--border-size-x)';
    }
  }
}
