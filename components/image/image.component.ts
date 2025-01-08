import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_IMAGE_FALLBACK } from '@rapider/angular-components/core/image';
import { NzImageModule } from 'ng-zorro-antd/image';
import {
  BorderConfig,
  BoxShadowConfig,
  computeBorderStyles,
  SizeConfig,
  SpacingConfig,
} from '@rapider/angular-components/core/style';

@Component({
  selector: 'rpd-image',
  imports: [
    CommonModule,
    NzImageModule,
  ],
  standalone: true,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  source = input<string, string | null | undefined>('', {
    transform: (initialValue) => {
      console.log(initialValue)
      if (!initialValue) {
        return DEFAULT_IMAGE_FALLBACK;
      } else {
        return initialValue;
      }

    }
  });
  alternateText = input<string>('');
  width = input<string>('100px');
  height = input<string>();
  placeholder = input<string>('');
  fallback = input<string>(DEFAULT_IMAGE_FALLBACK);
  disablePreview = input<boolean | null | undefined, boolean>(true, {
    transform: (initialValue) => {
      if (initialValue == null) {
        return true;
      }
      return initialValue;
    }
  });
  borderSettings = input<BorderConfig>();
  customSizeSettings = input<SizeConfig>();
  shadowSettings = input<BoxShadowConfig>();
  paddingSettings = input<SpacingConfig>();
  marginSettings = input<SpacingConfig>();

  borderStyles = computed(() => {
    return computeBorderStyles({
      border: this.borderSettings()?.border,
      borderRadius: this.borderSettings()?.borderRadius,
    });
  });

  constructor() {
  }

  handleImageError() {
  }

}