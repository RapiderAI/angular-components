import { Component, OnInit, Input, forwardRef, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ADVANCED_RICH_TEXT_EDITOR_SETTINGS, MENTION_ALLOWED_CHARS, MENTION_DENOTATION_CHARS, RichTextEditorTheme, RichTextEditorType, SIMPLE_RICH_TEXT_EDITOR_SETTINGS } from '@rapider/angular-components/core/rich-text-editor';




// import ImageUploader from 'quill-image-uploader';
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const Quill;


@Component({
  selector: 'rappider-rich-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    //QuillModule - add this module instad of the  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  ],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderRichTextEditorComponent)
    }
  ]
})
export class RappiderRichTextEditorComponent implements OnInit, ControlValueAccessor {

  @Input() editorType: RichTextEditorType;
  @Input() theme: RichTextEditorTheme;
  @Input() placeholder: string;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() mentionSupported = false;
  @Input() mentionValues: string[];

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  _value: string;

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  RichTextEditorTheme = RichTextEditorTheme;

  /* supported toolbar settings */
  modules: {
    toolbar?: Array<any>;
    mention?: any;
    imageUploader?: any;
  };

  onChange: any = () => {
    /* TODO: code here */
  };

  onTouched: any = () => {
    /* TODO: code here */
  };


  ngOnInit(): void {
    this.setEditorSettings();
    if (this.mentionSupported && this.mentionValues) {
      // this.pushMentionModule();
    }

    // Quill.register('modules/imageUploader', ImageUploader);

    // this.pushImageUploaderModule();
  }

  /**
   * If mentionSupported is true then send mention to module
   *
   * @memberof RappiderRichTextEditorComponent
   */
  pushMentionModule() {
    const availableDatas = this.mentionValues.map(mentionValue => ({ value: mentionValue }));
    this.modules.mention = {
      allowedChars: MENTION_ALLOWED_CHARS,
      mentionDenotationChars: MENTION_DENOTATION_CHARS,
      source: function (searchTerm, renderItem, mentionChar) {
        let values;
        if (MENTION_DENOTATION_CHARS.includes(mentionChar)) {
          values = availableDatas;
        }
        if (searchTerm.length === 0) {
          renderItem(values, searchTerm);
        } else {
          const matches = values.filter(value =>
            ~value.value.toLowerCase().indexOf(searchTerm.toLowerCase())
          );
          renderItem(matches, searchTerm);
        }
      }
    };
  }

  pushImageUploaderModule() {
    this.modules.imageUploader = {
      upload: (file) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        fetch(
          'https://api.imgbb.com/1/upload?expiration=600&key=3292046317abb9ce16e6addb9a0c4c7e',
          {
            method: 'POST',
            body: formData
          }
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            resolve(result.data.url);
          })
          .catch((error) => {
            reject('Upload failed');
            console.error('Error:', error);
          });
      })
    };
  }

  setEditorSettings() {
    switch (this.editorType) {
      case RichTextEditorType.Simple:
        this.modules = SIMPLE_RICH_TEXT_EDITOR_SETTINGS;
        break;
      case RichTextEditorType.Advanced:
        this.modules = ADVANCED_RICH_TEXT_EDITOR_SETTINGS;
        break;
      default:
        this.modules = SIMPLE_RICH_TEXT_EDITOR_SETTINGS;
        break;
    }
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur() {
    this.blur.emit(this.value);
  }

}
