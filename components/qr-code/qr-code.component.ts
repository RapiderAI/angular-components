import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeElementType, QRCodeErrorCorrectionLevel } from '@rapider/angular-components/core/qr-code';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'rappider-qr-code',
  standalone: true,
  imports: [
    CommonModule,
    QRCodeComponent,
  ],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class RappiderQRCodeComponent implements OnInit, OnChanges {

  /**
   * String to encode
   *
   * Default: ''
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() qrData: string;

  /**
   * HTML alt attribute (supported by img, url)
   *
   * Default: null
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() alt: string;

  /**
   * Allow qrdata to be an empty string
   *
   * Default: false
   * @type {boolean}
   * @memberof RappiderQRCodeComponent
   */
  @Input() allowEmptyString: boolean;

  /**
   * HTML title attribute (supported by canvas, img, url)
   *
   * Default: null
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() title: string;

  /**
   * Link to your image
   *
   * Default: null
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() imageSrc: string;

  /**
   * 'canvas', 'svg', 'img', 'url' (alias for 'img')
   *
   * Default: null
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() elementType: QRCodeElementType;

  /**
   * height of your image
   *
   * Default: null
   * @type {number}
   * @memberof RappiderQRCodeComponent
   */
  @Input() imageHeight: number;

  /**
   * width of your image
   *
   * Default: null
   * @type {number}
   * @memberof RappiderQRCodeComponent
   */
  @Input() imageWidth: number;

  /**
   * Height/Width (any value)
   *
   * Default: 10
   * @type {number}
   * @memberof RappiderQRCodeComponent
   */
  @Input() width: number;

  /**
   * Define how much wide the quiet zone should be.
   *
   * Default: 4
   * @type {number}
   * @memberof RappiderQRCodeComponent
   */
  @Input() margin: number;

  /**
   * Scale factor. A value of 1 means 1px per modules (black dots).
   *
   * Default: 4
   * @type {number}
   * @memberof RappiderQRCodeComponent
   */
  @Input() scale: number;

  /**
   * QR Correction level ('L', 'M', 'Q', 'H')
   *
   * Default: 'M'
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() errorCorrectionLevel: QRCodeErrorCorrectionLevel;

  /**
   * 1-40
   *
   * Default: auto
   * @type {number}
   * @memberof RappiderQRCodeComponent
   */
  @Input() version: number;

  /**
   * RGBA color, color of dark module (foreground)
   *
   * Default: '#000000ff'
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() colorDark: string;

  /**
   * RGBA color, color of light module (background)
   *
   * Default: '#ffffffff'
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() colorLight: string;

  /**
   * CSS Class
   *
   * Default: 'qrcode'
   * @type {string}
   * @memberof RappiderQRCodeComponent
   */
  @Input() cssClass: string;

  /**
   * Returns the QR Code URL
   *
   * @memberof RappiderQRCodeComponent
   */
  @Output() qrCodeURL = new EventEmitter<SafeUrl>();

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initDefaults();
  }

  initDefaults() {
    /* set default values if it is null */
    this.qrData = this.qrData ?? '';
    this.allowEmptyString = this.allowEmptyString ?? false;
    this.elementType = this.elementType ?? QRCodeElementType.Canvas;
    this.width = this.width ?? 10;
    this.margin = this.margin ?? 4;
    this.scale = this.scale ?? 4;
    this.errorCorrectionLevel = this.errorCorrectionLevel ?? QRCodeErrorCorrectionLevel.Medium;
    this.colorDark = this.colorDark ?? '#000000ff';
    this.colorLight = this.colorLight ?? '#ffffffff';
  }

  onQRCodeUrl(event: any) {
    // TODO: It is not written in the document under what conditions it works. Need to search.
    // URL: https://www.npmjs.com/package/angularx-qrcode
  }
}
