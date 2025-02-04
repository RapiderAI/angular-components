import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
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
  PopConfirmPlacement
} from '@rapider/angular-components/core/button';

@Component({
  selector: 'rappider-button',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzToolTipModule,
    RouterModule,
    NzPopconfirmModule,
    RappiderIconComponent,
    TranslateModule,
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class RappiderButtonComponent implements OnInit, OnChanges {

  /**
   * if the redirectUrl has a value, the button redirects to the provided url
   *
   * @type {string}
   * @memberof RappiderButtonComponent
   */
  @Input() redirectUrl: string;

  /**
   * redirect target
   * page: paths of angular pages
   * _self: javascript self target
   * _blank: javascript _blank target
   *
   * @memberof RappiderButtonComponent
   */
  @Input() redirectTarget: string = ButtonRedirectTarget.Page;

  @Input() key: string;
  /* can be set to primary dashed link */
  @Input() type: ButtonType;
  /* 	can be set to circle round */
  @Input() shape: ButtonShape;
  /* button text */
  @Input() text: string;
  /* size */
  @Input() size: ButtonSize;
  /* make background transparent and invert text and border colors */
  @Input() transparent: boolean;
  /* set the loading status of button */
  @Input() loading: boolean;
  /* option to fit button width to its parent width */
  @Input() block: boolean;
  /* set the disabled status of button */
  @Input() disabled: boolean;
  /* color type */
  @Input() colorType: ButtonColorType;
  /* button icon interface */
  @Input() icon: IconComponentConfig;
  /* Title of the confirmation box */
  @Input() popconfirmTitle: string;
  /* Whether to directly emit onConfirm without showing Popconfirm */
  @Input() emitWithoutPopconfirm: boolean;
  /* Pop confirm cancel button text */
  @Input() popconfirmCancelText: string;
  /* Pop confirm confirm button text */
  @Input() popconfirmOkText: string;
  /* Make pop confirm button type danger */
  @Input() popconfirmOkDanger: boolean;
  @Input() popconfirmPlacement: PopConfirmPlacement;
  @Input() iconPlacement: ButtonIconPlacement;
  /* the type of button */
  @Input() formButtonType: FormButtonType;
  @Input() borderSettings: BorderConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() shadowSettings: BoxShadowConfig;
  @Input() customColorSettings: ColorConfig;
  @Input() customSizeSettings: SizeConfig;
  /* tooltip text */
  @Input() tooltipText?: string;
  @Input() tooltipPlacement: TooltipPlacement;

  @Input() elementId?: string;

  /* Custom CSS Class */
  @Input() customCssClass?: string;

  ButtonIconPlacement = ButtonIconPlacement;

  /* Callback of confirmation */
  @Output() confirm = new EventEmitter<void>();
  /* Callback of cancel */
  @Output() popconfirmCancel = new EventEmitter<void>();

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
    if (this.emitWithoutPopconfirm == null) {
      this.emitWithoutPopconfirm = true;
    }
    /* emit directly if popconfirm is doesnt exist or empty string */
    if (this.popconfirmTitle == null || this.popconfirmTitle === '') {
      this.emitWithoutPopconfirm = true;
    }
  }

  onConfirm() {
    this.confirm.emit();

    if (this.redirectUrl && this.redirectTarget && this.redirectTarget !== ButtonRedirectTarget.Page) {
      window.open(this.redirectUrl, this.redirectTarget);
    }
  }

  onCancel() {
    this.popconfirmCancel.emit();
  }

  onButtonClick() {
    if (this.redirectUrl && this.redirectTarget === ButtonRedirectTarget.Page) {
      this.router.navigateByUrl(this.redirectUrl);
    }
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.blur();
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border || null,
      borderRadius: this.borderSettings?.borderRadius || null
    });
  }
}
