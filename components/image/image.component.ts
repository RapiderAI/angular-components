import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_IMAGE_FALLBACK } from '@rapider/angular-components/core/image';
import { BorderConfig, BoxShadowConfig, computeBorderStyles, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'rappider-image',
  standalone: true,
  imports: [
    CommonModule,
    NzImageModule,
  ],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class RappiderImageComponent implements OnInit, OnChanges {

  /* image source data */
  @Input() source: string;
  /* alternate text for the image, if the image for some reason cannot be displayed */
  @Input() alternateText: string;
  /* width property */
  @Input() width: string;
  /* height property */
  @Input() height: string;
  /* displays placeholder's source */
  @Input() placeholder: string;
  /* load failure fault-tolerant image*/
  @Input() fallback: string;
  @Input() disablePreview: boolean;
  @Input() borderSettings: BorderConfig;
  @Input() customSizeSettings: SizeConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;

  borderStyles: any = {};

  ngOnInit() {
    this.initDefaults();
    this.setBorderStyles();
  }

  ngOnChanges() {
    this.initDefaults();
    this.setBorderStyles();
  }

  initDefaults() {
    if (!this.fallback) {
      this.fallback = DEFAULT_IMAGE_FALLBACK;
    };
    if (this.disablePreview == null) {
      this.disablePreview = true;
    }
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }
}
