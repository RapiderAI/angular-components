import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';

import { Clipboard } from '@angular/cdk/clipboard';
import { MonacoEditorComponent } from './components/monaco-editor/monaco-editor.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderSpinComponent } from '@rapider/angular-components/spin';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { BorderConfig } from '@rapider/angular-components/core/style';
import { MonacoEditorModel, MonacoEditorRegion } from './utils/monaco-editor.types';
import { MONACO_EDITOR_CONFIG } from './utils/monaco-editor.config';

@Component({
  selector: 'rappider-monaco-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  imports:[
    CommonModule,
    FormsModule,
    TranslateModule,
    RappiderSpinComponent,
    RappiderButtonComponent,
    MonacoEditorComponent
  ],
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeEditorComponent),
    multi: true
  },
  {
    provide: MONACO_EDITOR_CONFIG, 
    useValue: { theme: 'vs-dark', language: 'typescript' } // Burada config belirleniyor
  }]
})
export class CodeEditorComponent implements OnInit, OnChanges, ControlValueAccessor {
  @ViewChild('editorComponentRef', { static: true }) _editorComponent: MonacoEditorComponent;

  @Input() borderSettings: BorderConfig;
  @Input() pasteItemFunction?: (event: any, editor: any) => void;
  @Input() showToolbar? = false;
  @Input() showSelectedKeyPath? = false;
  @Input() loading = false;
  @Input() toolbarButtons: ButtonComponentConfig[];
  @Input() autoFormat = false;
  @Input() disabled = false;
  @Input() theme?: string = 'dark';
  @Input() options;
  @Input() model: MonacoEditorModel;

  @Output() init = new EventEmitter<any>();
  @Output() selectedKeyFullPathChange = new EventEmitter();
  @Output() toolbarButtonClicked = new EventEmitter();
  /**
  * Emits custom regions with content and range information
  *
  * @memberof MonacoEditorComponent
  */
  @Output() customCodeRegions = new EventEmitter<MonacoEditorRegion[]>();

  /* selected key path */
  fullKeyPath: string;
  /* set true for 2sec when copy button clicked */
  copyButtonClicked: boolean;
  markdownMode: string = null;

  markDownModeRadioConfig = [
    {
      value: 'markdown',
      label: 'Markdown'
    },
    {
      value: 'markdownPreview',
      label: 'Preview'
    },
    {
      value: 'markdownAndPreview',
      label: 'Markdown & Preview'
    }
  ];

  private _value = '';
  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value || '';
    this.propagateChange(value);
    this.onTouched();
  }

  propagateChange = (_: any) => { };
  onTouched = () => { };

  constructor(
    private nzConfigService: NzConfigService,
    private clipboard: Clipboard
  ) { }


  writeValue(value: string): void {
    this._value = value || '';
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.applyTheme();
  }

  ngOnChanges() {
    this.applyTheme();
    this.controlReadOnlyOption();
  }

  controlReadOnlyOption() {
    this.options = {
      ...this.options,
      readOnly: this.disabled
    };
  }

  copyFullKeyPath() {
    this.clipboard.copy(this.fullKeyPath);
    this.copyButtonClicked = true;
    setTimeout(() => this.copyButtonClicked = false, 2000);
  }

  applyTheme() {
    const defaultEditorOption = this.nzConfigService.getConfigForComponent('codeEditor')?.defaultEditorOption || {};
    this.nzConfigService.set('codeEditor', {
      defaultEditorOption: {
        ...defaultEditorOption,
        theme: this.theme === 'dark' ? 'vs-dark' : 'vs'
      }
    });
  }

  onToolbarButtonClick(button: ButtonComponentConfig) {
    this.toolbarButtonClicked.emit(button);
  }

  onMarkdownPreviewModeChange(event) {
    setTimeout(() => {
      this._editorComponent._editor.layout();
    }, 100);
    setTimeout(() => {
      this._editorComponent._editor.layout();
    }, 500);
  }

  onEditorInit(_editor) {
    this.init.emit(_editor);
  }

  onSelectedKeyFullPathChange(path) {
    this.fullKeyPath = path;
  }

  getEditorClass() {
    if (this.showSelectedKeyPath && !this.showToolbar) {
      return 'editor-with-footer';
    } else if (this.showToolbar && !this.showSelectedKeyPath) {
      return 'editor-with-header';
    } else if (this.showToolbar && this.showSelectedKeyPath) {
      return 'editor-with-header-and-footer';
    } else {
      return 'monaco-editor';
    }
  }

  getBorderSettings() {
    return this.borderSettings ? `
    border: ${this.borderSettings.border || 'unset'};
    borderTop: ${this.borderSettings.borderTop || 'unset'};
    borderBottom: ${this.borderSettings.borderBottom || 'unset'};
    borderLeft: ${this.borderSettings.borderLeft || 'unset'};
    borderRight: ${this.borderSettings.borderRight || 'unset'};
    borderRadius: ${this.borderSettings.borderRadius || 'unset'};
    borderTopRightRadius: ${this.borderSettings.borderTopRightRadius || 'unset'};
    borderTopLeftRadius: ${this.borderSettings.borderTopLeftRadius || 'unset'};
    borderBottomLeftRadius: ${this.borderSettings.borderBottomLeftRadius || 'unset'};
    borderBottomRightRadius: ${this.borderSettings.borderBottomRightRadius || 'unset'};
    borderStyle: ${this.borderSettings.borderStyle || 'unset'};
    borderColor: ${this.borderSettings.borderColor || 'unset'};
    `: null;
  }

  onCustomCodeRegionsEmitted(regions: MonacoEditorRegion[]) {
    this.customCodeRegions.emit(regions);
  }

}
