import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  HostBinding,
  computed,
  input,
  output,
  effect,
} from '@angular/core';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig,
  computeBorderStyles,
} from '@rapider/angular-components/core/style';
import { TextComponentConfig } from '@rapider/angular-components/core/text';
import { HeadingComponentConfig, HeadingType } from '@rapider/angular-components/core/heading';
import { ButtonComponentConfig } from '@rapider/angular-components/core/button';
import { AlertType, AlertActionConfigPlacement } from '@rapider/angular-components/core/alert';
import { ButtonComponent } from '@rapider/angular-components/button';
import { TextComponent } from '@rapider/angular-components/text';
import { HeadingComponent } from '@rapider/angular-components/heading';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  selector: 'rpd-alert',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TextComponent,
    HeadingComponent,
    NzAlertComponent,
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  /* data to emit */
  data = input<any>();
  type = input<AlertType>(AlertType.Info);
  title = input<HeadingComponentConfig, HeadingComponentConfig | string | null | undefined>(null, {
    transform: (initialValue) => {
      if (!initialValue) {
        return {};
      }
      if (typeof initialValue === 'string') {
        return {
          content: initialValue,
          type: HeadingType.H5
        };
      }
      return initialValue;
    }
  });
  description = input<TextComponentConfig, TextComponentConfig | string | null | undefined>(null, {
    transform: (initialValue) => {
      if (!initialValue) {
        return {};
      }
      if (typeof initialValue === 'string') {
        return {
          text: initialValue
        };
      }
      return initialValue;
    }
  });
  showIcon = input<boolean, boolean | null | undefined>(true, {
    transform: (initialValue) => {
      if (initialValue == null) {
        return true;
      }
      return initialValue;
    }
  });
  closeable = input<boolean, boolean | null | undefined>(true, {
    transform: (initialValue) => {
      if (initialValue == null) {
        return true;
      }
      return initialValue;
    }
  });
  actionConfig = input<ButtonComponentConfig>();
  actionConfigPlacement = input<AlertActionConfigPlacement>();

  /* styles */
  borderSettings = input<BorderConfig>();
  sizeSettings = input<SizeConfig>();
  colorSettings = input<ColorConfig>();
  boxShadowSettings = input<BoxShadowConfig>();
  paddingSettings = input<SpacingConfig>();
  marginSettings = input<SpacingConfig>();

  actionClick = output<void>();

  @HostBinding('style.--alert-padding') padding?: string;
  @HostBinding('style.--alert-height') height?: string;
  @HostBinding('style.--alert-min-height') minHeight?: string;
  @HostBinding('style.--alert-max-height') maxHeight?: string;

  AlertType = AlertType;

  getValidType = computed(() => {
    const type = this.type();
    if (type === AlertType.ThemeBackground) {
      return AlertType.Info;
    }
    return type;
  });

  ngOnInit() {
    this.initDefaults();

    effect(() => {
      this.initDefaults();
    });
  }

  initDefaults() {
    this.setConfig();
  }

  onActionClick() {
    this.actionClick.emit(this.data());
  }

  setConfig() {
    if (this.paddingSettings) {
      this.padding = this.paddingSettings()?.all;
    } else {
      this.padding = 'var(--padding-2x) var(--padding-4x)';
    }

    if (this.sizeSettings) {
      this.height = this.sizeSettings()?.height;
      this.minHeight = this.sizeSettings()?.minHeight;
      this.maxHeight = this.sizeSettings()?.maxHeight;
    }
  }

  borderStyles = computed(() => {
    return computeBorderStyles({
      border: this.borderSettings()?.border,
      borderRadius: this.borderSettings()?.borderRadius,
    });
  });

}
