import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostBinding,
} from '@angular/core';
import {
  BorderConfig,
  BoxShadowConfig,
  ColorConfig,
  SizeConfig,
  SpacingConfig,
  computeBorderStyles,
} from '@rapider/angular-components/core/style';
import { TranslateModule } from '@ngx-translate/core';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { HeadingComponentConfig, HeadingType } from '@rapider/angular-components/core/heading';
import { AlertType, AlertActionConfigPlacement } from '@rapider/angular-components/core/alert';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
    RappiderTextComponent,
    RappiderHeadingComponent,
    NzAlertComponent,
    TranslateModule,
  ],
  selector: 'rappider-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class RappiderAlertComponent implements OnInit, OnChanges {
  /* data to emit */
  @Input() data: any;
  @Input() type: AlertType;
  @Input() title: HeadingComponentConfig;
  @Input() description: TextComponentConfig;
  @Input() showIcon: boolean;
  @Input() closeable: boolean;
  @Input() actionConfig?: ButtonComponentConfig;
  @Input() actionConfigPlacement: AlertActionConfigPlacement;
  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;

  @Output() actionClick = new EventEmitter();

  @HostBinding('style.--alert-padding') padding;

  @HostBinding('style.--alert-height') height;
  @HostBinding('style.--alert-min-height') minHeight;
  @HostBinding('style.--alert-max-height') maxHeight;

  AlertType = AlertType;
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
    if (this.showIcon === null) {
      this.showIcon = true;
    }
    if (this.closeable === null) {
      this.closeable = true;
    }
    if (typeof this.description === 'string') {
      this.description = {
        text: this.description
      };
    }
    if (typeof this.title === 'string') {
      this.title = {
        content: this.title,
        type: HeadingType.H5
      };
    }
    this.setConfig();
  }

  onActionClick() {
    this.actionClick.emit(this.data);
  }

  setConfig() {
    if (this.paddingSettings) {
      this.padding = this.paddingSettings?.all;
    } else {
      this.padding = 'var(--padding-2x) var(--padding-4x)';
    }

    if (this.sizeSettings) {
      this.height = this.sizeSettings?.height;
      this.minHeight = this.sizeSettings?.minHeight;
      this.maxHeight = this.sizeSettings?.maxHeight;
    }
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border,
      borderRadius: this.borderSettings?.borderRadius
    });
  }
}
