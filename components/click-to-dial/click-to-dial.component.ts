import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { NgxMaskService } from 'ngx-mask';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'rappider-click-to-dial',
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
    RappiderIconComponent,
  ],
  providers: [provideNgxMask()],
  templateUrl: './click-to-dial.component.html',
  styleUrls: ['./click-to-dial.component.scss'],
})
export class RappiderClickToDialComponent implements OnInit, OnChanges {
  /**
   * Indicates if the button is active and clickable
   * @default true
   */
  @Input() status: boolean;

  /**
   * Raw value (e.g., phone number) provided to the component
   *
   * @type {string}
   * @memberof RappiderClickToDialComponent
   */
  @Input() value: string;

  /**
   * Mask format for displaying the value (e.g., '(000) 000-0000')
   *
   * @type {string}
   * @memberof RappiderClickToDialComponent
   */
  @Input() mask: string;

  /**
   * If true, the masked value will be displayed; otherwise, the raw value is shown
   *
   * @default false
   * @type {boolean}
   * @memberof RappiderClickToDialComponent
   */
  @Input() showMaskTyped: boolean;

  /** Value displayed on the button */
  displayValue: string;

  constructor(private maskService: NgxMaskService) { }

  ngOnInit(): void {
    this.updateDisplayValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['mask'] || changes['showMaskTyped']) {
      this.updateDisplayValue();
    }
  }

  /**
   * Handles the dial action by using the raw (unmasked) value
   */
  dial(): void {
    const rawValue = this.removeMask(this.value, this.mask);
    if (this.status) {
      window.open(`tel:${rawValue}`);
    }
  }

  /**
   * Updates the value displayed on the button based on the mask and showMaskTyped setting
   */
  private updateDisplayValue(): void {
    if (this.showMaskTyped && this.value && this.mask) {
      this.displayValue = this.maskService.applyMask(this.value, this.mask);
    } else {
      this.displayValue = this.value;
    }
  }

  /**
   * Removes the mask characters from the value
   * @param value - The input value
   * @param mask - The mask format to be removed
   * @returns The raw (unmasked) value
   */
  private removeMask(value: string, mask: string): string {
    if (!value || !mask) {
      return value;
    }
    const maskCharacters = mask.replace(/0|9|A/g, '');
    const regex = new RegExp(`[${maskCharacters}]`, 'g');
    return value.replace(regex, '');
  }
}
