import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { PreviewerComponentConfig, RappiderPreviewerComponent } from '@rapider/angular-components/previewer';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'rappider-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    NzUploadModule,
    RappiderButtonComponent,
    RappiderPreviewerComponent
  ],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderDocumentUploadComponent),
      multi: true
    }
  ]
})
export class RappiderDocumentUploadComponent implements ControlValueAccessor {
  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() elementId: string;
  @Input() previewerConfig: PreviewerComponentConfig;

  @Output() fileSelected = new EventEmitter<any>();

  browseFileText = 'Browse File';
  source: any;

  _value: any;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.fileSelected.emit(value);
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

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/png') || file.type.startsWith('image/jpeg') || file.type.startsWith('image/bmp')) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewImageUrl = reader.result as string;
        this.value = file;
        this.source = previewImageUrl;
      };
      reader.readAsDataURL(file);
    } else if (file && file.type.startsWith('application/pdf')) {
      this.value = file;
      this.source = file;
    }
    this.previewerConfig.buttonConfig.text = file?.name;
    this.browseFileText = 'Change File';
  }

}
