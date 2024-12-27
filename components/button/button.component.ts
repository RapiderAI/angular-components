import { Component, input, OnChanges, OnInit, output, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TextComponent } from '@rapider/angular-components/text';
import { IconComponentConfig } from '@rapider/angular-components/core/icon';
import { IconComponent } from '@rapider/angular-components/icon';
import {
  SpacingConfig,
  BorderConfig,
  SizeConfig,
  BoxShadowConfig,
  ColorConfig,
  computeBorderStyles,
} from '@rapider/angular-components/core/style';
import {
  ButtonRedirectTarget,
  ButtonType,
  ButtonShape,
  ButtonSize,
  ButtonColorType,
  FormButtonType,
  TooltipPlacement,
  ButtonIconPlacement,
} from '@rapider/angular-components/core/button';

@Component({
  selector: 'rpd-button',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzToolTipModule,
    RouterModule,
    NzPopconfirmModule,
    TextComponent,
    IconComponent,
  ],
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit, OnChanges {

  /**
   * if the redirectUrl has a value, the button redirects to the provided url
   *
   * @type {string}
   * @memberof ButtonComponent
   */

  redirectUrl = input<string>();

  /**
   * redirect target
   * page: paths of angular pages
   * _self: javascript self target
   * _blank: javascript _blank target
   *
   * @memberof ButtonComponent
   */
  redirectTarget = input<ButtonRedirectTarget>(ButtonRedirectTarget.Page);

  key = input<string>();
  /* can be set to primary dashed link */
  type = input<ButtonType>();
  /* 	can be set to circle round */
  shape = input<ButtonShape>(null);
  /* size */
  size = input<ButtonSize>('default');
  /* button text */
  text = input<string>('Button');

  /* make background transparent and invert text and border colors */
  transparent = input<boolean>();
  /* set the loading status of button */
  loading = input<boolean>(false);
  /* option to fit button width to its parent width */
  block = input<boolean>(false);
  /* set the disabled status of button */
  disabled = input<boolean>(false);
  /* color type */
  colorType = input<ButtonColorType>();
  /* button icon interface */
  icon = input<IconComponentConfig | undefined>();
  /* Title of the confirmation box */
  popconfirmTitle = input<string>();
  /* Whether to directly emit onConfirm without showing Popconfirm */
  emitWithoutPopconfirm = input<boolean>();
  emitWithoutPopconfirmSignal = signal(this.emitWithoutPopconfirm());
  /* Pop confirm cancel button text */
  popconfirmCancelText = input<string>();
  /* Pop confirm confirm button text */
  popconfirmOkText = input<string>();
  /* Make pop confirm button type danger */
  popconfirmOkDanger = input<boolean>();
  iconPlacement = input<ButtonIconPlacement>();
  /* the type of button */
  formButtonType = input<FormButtonType>();
  borderSettings = input<BorderConfig>();
  marginSettings = input<SpacingConfig>();
  paddingSettings = input<SpacingConfig>();
  shadowSettings = input<BoxShadowConfig>();
  customColorSettings = input<ColorConfig>();
  customSizeSettings = input<SizeConfig>();
  /* tooltip text */
  tooltipText = input<string>();
  tooltipPlacement = input<TooltipPlacement>();

  elementId = input<string>();

  /* Custom CSS Class */
  customCssClass = input<string>();

  protected readonly ButtonIconPlacement = ButtonIconPlacement;

  /* Callback of confirmation */
  confirm = output<void>();
  /* Callback of cancel */
  popconfirmCancel = output<void>();

  ButtonRedirectTarget = ButtonRedirectTarget;

  borderStyles: any = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.initDefaults();
    this.setBorderStyles();
  }

  ngOnChanges() {
    this.initDefaults();
    this.setBorderStyles();
  }

  initDefaults() {
    if (this.emitWithoutPopconfirm() == null) {
      this.emitWithoutPopconfirmSignal.set(true);
    }
    /* emit directly if popconfirm is doesnt exist or empty string */
    if (this.popconfirmTitle() == null || this.popconfirmTitle() === '') {
      this.emitWithoutPopconfirmSignal.set(true);
    }
  }

  onConfirm() {
    this.confirm.emit();

    if (this.redirectUrl() && this.redirectTarget() && this.redirectTarget() !== ButtonRedirectTarget.Page) {
      window.open(this.redirectUrl(), this.redirectTarget());
    }
  }

  onCancel() {
    this.popconfirmCancel.emit();
  }

  onButtonClick() {
    if (this.redirectUrl() && this.redirectTarget() === ButtonRedirectTarget.Page) {
      this.router.navigateByUrl(this.redirectUrl()!);
    }
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.blur();
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings()?.border,
      borderRadius: this.borderSettings()?.borderRadius,
    });
  }
}
