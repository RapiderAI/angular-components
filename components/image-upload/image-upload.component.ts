import { Component, EventEmitter, forwardRef, Input,Output, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ImageComponentConfig, RappiderImageComponent } from '@rapider/angular-components/image';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { ButtonType } from '@rapider/angular-components/core/button';
import { RappiderSpinComponent } from '@rapider/angular-components/spin';
import { RappiderPreviewerComponent } from '@rapider/angular-components/previewer';
import { CrudFormPreviewerItem } from '@rapider/angular-components/core/edit-form';

@Component({
  selector: 'rappider-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    NzUploadModule,
    FormsModule,
    ReactiveFormsModule,
    RappiderButtonComponent,
    RappiderImageComponent,
    RappiderSpinComponent,
    RappiderPreviewerComponent,
  ],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderImageUploadComponent),
      multi: true,
    },
  ],
})
export class RappiderImageUploadComponent {
  @ViewChild('imageUploadInputElement') imageUploadInputElement: ElementRef;

  @Input() uploadedImage: ImageComponentConfig;
  @Input() uploadButtonVisibility: boolean;
  @Input() isLoading: boolean;
  @Input() uploadButton: ButtonComponentConfig;
  @Input() previewerConfig: CrudFormPreviewerItem;

  @Output() fileSelect = new EventEmitter<File>();

  _value: any;

  ngOnInit(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (!this.uploadButton?.text && !this.uploadButton?.icon.name) {
      this.uploadButton = {
        ...this.uploadButton,
        text: 'Upload',
        icon: { name: 'fa-light fa-upload', color: 'var(--text-color)' },
        type: ButtonType.Default,
        block: true,
      };
    }
    if (!this.uploadedImage?.width && !this.uploadedImage?.height) {
      this.uploadedImage = {
        ...this.uploadedImage,
        width: '128px',
        height: 'auto',
      };
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initDefaults();
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.fileSelect.emit(value);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value !== null) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  click() {
    this.imageUploadInputElement.nativeElement.click();
  }

  onFileSelect(event: any) {
    const file: File = event[0];
    if (
      (file && file.type.startsWith('image/png')) ||
      file.type.startsWith('image/jpeg') ||
      file.type.startsWith('image/bmp')
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewImageUrl = reader.result as string;
        this.value = previewImageUrl;
      };
      reader.readAsDataURL(file);
    }

    this.previewerConfig = {
      ...this.previewerConfig,
      buttonConfig: {
        text: file?.name,
      },
    };
    this.uploadButton = {
      ...this.uploadButton,
      text: 'Change Avatar',
    }; 
  }
}
