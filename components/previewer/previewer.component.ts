import { Component, EventEmitter, Input, Output, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderImageComponent } from '@rapider/angular-components/image';
import { RappiderPdfViewerComponent } from '@rapider/angular-components/pdf-viewer';
import { ModalComponentConfig, RappiderModalComponent } from '@rapider/angular-components/modal';



@Component({
  selector: 'rappider-previewer',
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
    RappiderImageComponent,
    RappiderPdfViewerComponent,
    RappiderModalComponent
  ],
  templateUrl: './previewer.component.html',
  styleUrls: ['./previewer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderPreviewerComponent),
      multi: true
    }
  ]
})
export class RappiderPreviewerComponent implements ControlValueAccessor, OnChanges {
  @Input() modalConfig: ModalComponentConfig;
  @Input() buttonConfig: ButtonComponentConfig;
  @Input() source: any;
  @Input() visibility: boolean;

  @Output() visibleChange = new EventEmitter<boolean>();

  pdfViewerVisibility = false;
  isPDF: boolean;

  _value: string;

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['source']) {
      if (this.source?.type === 'application/pdf' || this.source?.startsWith('data:application/pdf')) {
        this.isPDF = true;
      } else {
        this.isPDF = false;
      }
    }
    if (changes['visibility']) {
      if (this.visibility) {
        setTimeout(() => {
          this.pdfViewerVisibility = true;
        }, 100);
      }
    }
  }

  onSelectButtonClick() {
    this.visibility = true;
    setTimeout(() => {
      this.pdfViewerVisibility = true;
    }, 100);
  }

  onSelectClick() {
    this.onCloseModal();
  }

  closeModalAndClearSelectedTemplate() {
    this.onCloseModal();
  }

  onCloseModal() {
    this.visibility = false;
    this.pdfViewerVisibility = false;
    this.visibleChange.emit(false);
  }

}
