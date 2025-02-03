import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { marked } from 'marked';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RappiderSpinComponent } from '@rapider/angular-components/spin';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { MonacoEditorModel, MonacoEditorRegion } from '@rapider/angular-components/core/code-editor';
import { MONACO_EDITOR_CONFIG } from '@rapider/angular-components/core/code-editor';
import { CUSTOM_CODE_REGION_REGEXES } from '@rapider/angular-components/core/code-editor';
import { CUSTOM_CODE_REGION_MARKERS } from '@rapider/angular-components/core/code-editor';
import { CodeEditorComponentConfig } from '../../utils';

// eslint-disable-next-line no-var
declare var monaco: any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let loadedMonaco = false;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let loadPromise: Promise<void>;

@Component({
  selector: 'rappider-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RappiderSpinComponent,
    RappiderButtonComponent
  ],
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonacoEditorComponent),
    multi: true
  },
  {
    provide: MONACO_EDITOR_CONFIG,
    useValue: { theme: 'vs-dark', language: 'typescript' }
  }]
})
export class MonacoEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @ViewChild('editorContainer', { static: true }) _editorContainer: ElementRef;

  @Input() pasteItemFunction?: (event: any, editor: any) => void;
  @Input() autoFormat = false;
  @Input() showSelectedKeyPath: boolean;
  @Input() markdownMode: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('options')
  set options(options: any) {
    this._options = Object.assign({}, this.editorConfig.defaultOptions, options);
    const isDarkTheme = document.body.className.includes('dark');
    this._options = {
      ...this._options,
      theme: isDarkTheme ? 'vs-dark' : 'vs-default'
    };
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options);
    }
  }

  get options(): any {
    return this._options;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('model')
  set model(model: MonacoEditorModel) {
    this.options.model = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options);
    }
  }

  @Output() init = new EventEmitter<any>();
  @Output() selectedKeyFullPathChange = new EventEmitter();
  /**
   * Emits custom regions with content and range information
   *
   * @memberof MonacoEditorComponent
   */
  @Output() customCodeRegions = new EventEmitter<MonacoEditorRegion[]>();

  /* in order to show a markdown preview, we will set the value if the language is markdown */
  markDownPreviewValue: string | Promise<string> = '';

  customizedPasteHandleInitialized = false;
  resizeObserver: ResizeObserver;
  fullKeyPath: string;

  /* Saves the text decoration e.g. editable line background
   * so that we dont have to reapply it on every value change
   */
  textDecorations: string[] = [];


  /**
   * If there is restriction in the editor, this variable will hold the editable regions and allowed lines
   * Editable regions are the regions that user can edit, other lines are read only on restricted mode
   *
   * @type {MonacoEditorRegion[]}
   * @memberof MonacoEditorComponent
   */
  editableRegions: MonacoEditorRegion[] = [];

  hasCustomCodeRegionMarkerInSelection = false;

  private _value = '';
  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value || '';
    this.propagateChange(value);
    this.onTouched();
  }
  _editor: any;
  private _options: any;

  propagateChange = (_: any) => { };
  onTouched = () => { };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private zone: NgZone,
    @Inject(MONACO_EDITOR_CONFIG) private editorConfig: CodeEditorComponentConfig
  ) { }

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this.options);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = (this.editorConfig.baseUrl || './assets') + '/monaco-editor/min/vs';
        if (typeof ((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': `${baseUrl}` } });
          (<any>window).require(['vs/editor/editor.main'], () => {
            if (typeof this.editorConfig.onMonacoLoad === 'function') {
              this.editorConfig.onMonacoLoad();
            }
            this.initMonaco(this.options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });

      /* Paste handling for markdown paste image  */
      if (this.options?.language === 'markdown' && !this.customizedPasteHandleInitialized) {
        this.addPasteHandler();
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy() {
    this.resizeObserver.disconnect();
    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }

  observeParentResize() {
    this.resizeObserver = new ResizeObserver(entries => this._editor?.layout());
    const interval = setInterval(() => {
      const element = document.getElementById('monaco-editor-main-container');
      if (element) {
        this.resizeObserver.observe(element);
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * This function is used to set the full key path of the selected key in the JSON editor.
   * This function is used to copy the full key path of the selected key in the JSON editor on data transformation.
   *
   * @memberof MonacoEditorComponent
   */
  setFullKeyPathFeature() {
    if (this.showSelectedKeyPath) {
      this._editor?.onMouseDown(event => {
        const position = event.target.position;
        const model = this._editor.getModel();
        const wordAtPosition = model.getWordAtPosition(position);

        if (wordAtPosition) {
          const selectedKey = wordAtPosition.word;
          const lineNumber = position.lineNumber;
          const lineContent = model.getLineContent(lineNumber);
          const jsonContent = JSON.parse(this.value);
          this.fullKeyPath = this.getNestedKeyPath(jsonContent, selectedKey, lineNumber, lineContent);
          if (this.fullKeyPath) {
            this.selectedKeyFullPathChange.emit(this.fullKeyPath);
          }
        }
      });
    }
  }

  getNestedKeyPath(obj, targetKey, currentLine, lineContent) {
    for (const key in obj) {
      if (key === targetKey) {
        return key;
      } else if (typeof obj[key] === 'object') {
        const nestedPath = this.getNestedKeyPath(obj[key], targetKey, currentLine, lineContent);
        if (nestedPath) {
          return key + '.' + nestedPath;
        }
      }
    }
    return null;
  }

  writeValue(value: any): void {
    this._value = value || '';
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this._editor && !this.options.model) {
        // set validation options
        this.setMonacoEditorOptions();
        this._editor.setValue(this._value);
      }
      if (this.options?.language === 'markdown') {
        this.setMarkDownPreviewValue(this._value);
      }
      if (this.autoFormat) {
        this.formatDocument();
      }
    }, 50);
  }

  setMarkDownPreviewValue(text: string) {
    if (this.options?.language === 'markdown') {
      const markdownTextWithLineBreaks = text;
      this.markDownPreviewValue = marked.parse(markdownTextWithLineBreaks, { breaks: true });
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  insertTextToCursor(text: string) {
    const selection = this._editor.getSelection();
    const op = { range: selection, text: text, forceMoveMarkers: true };
    this._editor.executeEdits('my-source', [op]);

    this._editor.trigger('keyboard', 'type', { text: text });
  }

  addPasteHandler() {
    window.addEventListener('paste', (pasteEvent: any) => {
      this.pasteItemFunction(pasteEvent, this._editor);
    });
  }

  setMonacoEditorOptions() {
    // Validation settings
    /*
    2792: Cannot find module '....' | this error is suppressed because we are not adding all files to the model at once
    1219: Experimental support for decorators is a feature that is subject to change in a future release. ...
    */
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [1109, 1219, 2792],
      // noSemanticValidation: true,
      // noSyntaxValidation: false,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [1109, 1219, 2792],
      // noSemanticValidation: true,
      // noSyntaxValidation: false,
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    // compiler options for typescript
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    // extra libraries
    const libSource = [
      'declare class Facts {',
      '    /**',
      '     * Returns the next fact',
      '     */',
      '    static next():string',
      '}',
    ].join('\n');
    const libUri = 'ts:filename/facts.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.

    if (!this._editor?.getOptions()) {
      // Commented because it causes errors where Jsonata is used
      // monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
    }
  }

  formatDocument() {
    setTimeout(() => {
      this._editor?.getAction('editor.action.formatDocument')?.run();
    }, 100);
  }

  /**
   * This functions add an extra css class to the provided line numbers
   *
   * @param {number[]} lineNumbers
   * @param {string} cssClassName
   * @memberof MonacoEditorComponent
   */
  addCssClassToTheLines(lineNumbers: number[], cssClassName: string) {
    // Set an array of range and options for the editable lines
    const editableLineDecorations = lineNumbers.map(lineNumber => ({
      range: new monaco.Range(lineNumber, 1, lineNumber, 1),
      options: {
        isWholeLine: true,
        className: cssClassName,
        // inlineClassName: 'editable-line',
      }
    }));
    // Apply the background color text decoration for editable lines
    this.textDecorations = this._editor.deltaDecorations(this.textDecorations, editableLineDecorations);

  }

  /**
   * This function highlights the editable lines in the editor
   *
   * @memberof MonacoEditorComponent
   */
  highlightEditableLines(editableRegions: MonacoEditorRegion[]) {

    /* highlight the editable lines */
    /* create an array for each allowed line from editableRegions var, like [2,10,11,12,13,14,15] */
    const allowedLinesArray: number[] = [];
    editableRegions.forEach(allowedLine => {
      for (let i = allowedLine.startLine; i <= allowedLine.endLine; i++) {
        allowedLinesArray.push(i);
      }
    });

    this.addCssClassToTheLines(allowedLinesArray, 'monaco-editable-line');
  }


  /**
   * This function finds the custom code regions in the text
   *
   * @param {string} text
   * @return {*}  {MonacoEditorRegion[]}
   * @memberof MonacoEditorComponent
   */
  findCustomCodeRegions(editorContent: string): MonacoEditorRegion[] {
    const lines = editorContent.split('\n');
    const regions: MonacoEditorRegion[] = [];
    const stack: { key: string; startLine: number }[] = [];

    const language = this.options.language;

    const startRegex = CUSTOM_CODE_REGION_REGEXES?.find(regex => regex?.key === language)?.startRegionRegex;
    const endRegex = CUSTOM_CODE_REGION_REGEXES?.find(regex => regex?.key === language)?.endRegionRegex;

    lines.forEach((line, index) => {
      const regionStartMatch = line.match(startRegex);
      const regionEndMatch = line.match(endRegex);

      if (regionStartMatch) {
        stack.push({ key: regionStartMatch[1], startLine: index + 2 });
      }

      if (regionEndMatch) {
        const key = regionEndMatch[1];
        const startRegion = stack.find(region => region.key === key);
        if (startRegion) {
          const content = lines.slice(startRegion.startLine - 1, index).join('\n').trim();
          regions.push({
            key: key,
            startLine: startRegion.startLine,
            endLine: index,
            content: content
          });
          stack.splice(stack.indexOf(startRegion), 1);
        }
      }
    });

    return regions;
  }

  checkIfCustomCodeRegionMarkerInSelection() {
    const selection = this._editor.getSelection();
    if (!selection.isEmpty() && this.options.hasCustomCode) {
      const selectedText = this._editor.getModel().getValueInRange(selection);
      const selectedTextValue = selectedText.trim();

      const language = this.options.language;
      const marker = CUSTOM_CODE_REGION_MARKERS?.find(marker => marker?.key === language);

      const startRegionRegex = marker?.startRegionMarker;
      const endRegionRegex = marker?.endRegionMarker;

      if (startRegionRegex.test(selectedTextValue) || endRegionRegex.test(selectedTextValue)) {
        this.hasCustomCodeRegionMarkerInSelection = true;
      } else {
        this.hasCustomCodeRegionMarkerInSelection = false;
      }
    } else {
      this.hasCustomCodeRegionMarkerInSelection = false;
    }
  }

  protected initMonaco(options: any): void {

    this.setMonacoEditorOptions();

    const hasModel = !!options?.model;
    if (hasModel) {
      const model = monaco.editor.getModel(options.model.uri || '');
      if (model) {
        options.model = model;
        options.model.setValue(this._value);
      } else {
        options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
      }
    }
    if (!options.renderLineHighlight) {
      // removes border
      options.renderLineHighlight = 'none';
    }

    /* init monaco */
    this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);

    if (this.autoFormat) {
      this.formatDocument();
    }

    if (!hasModel) {
      this._editor.setValue(this._value);
      this.setMarkDownPreviewValue(this._value);
    }

    /* Check if the editor has edit restrictions and also allowed lines to highlight */
    if (this.options?.hasCustomCode) {
      // set the allowed lines
      this.editableRegions = this.findCustomCodeRegions(this._value);
      // highlight the allowed lines
      this.highlightEditableLines(this.editableRegions);
      // do not emit the custom code regions on init
    }

    this._editor.onDidPaste((event: any) => {
      console.log('onDidPaste', event);
    });


    this._editor.onDidChangeModelContent((e: any) => {

      let isEditingAllowed = true;
      let editorIsFlush = true;

      // Validate the changes
      if (e?.changes?.length) {
        /* isFlush boolean flag indicates that all decorations were lost with this edit.
         * The model has been reset to a new value, a new code
         */
        if (e?.isFlush) {
          editorIsFlush = true;
          // This is a new code or page refresh
          // If we need to do something when the editor is reset to a new value, we can do it here
        } else {
          editorIsFlush = false;
          // This is an incremental change, like typing. We need to check if the user is deleting the custom code region markers

          // Check if there is custom code option and the user is deleting the custom code region markers
          if (this.options?.hasCustomCode) {

            const replacingText = this._editor.getModel().getValueInRange(e.changes[0].range);
            const language = this.options.language;
            const marker = CUSTOM_CODE_REGION_MARKERS?.find(marker => marker?.key === language);

            const startRegionRegex = marker?.startRegionMarker;
            const endRegionRegex = marker?.endRegionMarker;

            this.checkIfCustomCodeRegionMarkerInSelection();
            if (this.hasCustomCodeRegionMarkerInSelection) {
              // If the user is deleting the custom code region markers, we need to reset the value
              console.log('You cannot make changes while custom code region markers are selected');
              this._editor.setValue(this._value);
              isEditingAllowed = false;
              return;
            } else if (e.changes.some((change: any) =>
              startRegionRegex.test(change?.text) || endRegionRegex.test(change?.text))) {
              // user is adding custom code region markers
              // reset the value to the previous value
              console.log('You cannot add custom code region markers');
              this._editor.setValue(this._value);
              isEditingAllowed = false;
              // TODO: show a message to the user that the custom code region markers cannot be added
              return;
            } else if (startRegionRegex.test(replacingText) || endRegionRegex.test(replacingText)) {
              // check if the replacing text contains custom code region markers
              // user is deleting custom code region markers
              // reset the value to the previous value
              console.log('You cannot delete custom code region markers');
              this._editor.setValue(this._value);
              isEditingAllowed = false;
              // TODO: show a message to the user that the custom code region markers cannot be deleted;
              return;
            }
          }
        }
      }
      if (isEditingAllowed) {
        const value = this._editor.getValue();

        // value is not propagated to parent when executing outside zone.
        this.zone.run(() => {

          /* Check if the editor has custom code and also allowed lines to highlight */
          if (this.options?.hasCustomCode) {
            // set the allowed lines
            this.editableRegions = this.findCustomCodeRegions(value);
            // highlight the allowed lines
            this.highlightEditableLines(this.editableRegions);
            // emit the custom code regions on model change
            if (!editorIsFlush) {
              this.customCodeRegions.emit(this.editableRegions);
            }
          }

          this._value = value;
          this.propagateChange(value);
          if (this.options?.language === 'markdown') {
            this.setMarkDownPreviewValue(this._value);
          }
        });
      }

    });

    this._editor.onDidChangeCursorSelection((e: any) => {
      this.checkIfCustomCodeRegionMarkerInSelection();
    });

    this._editor.onDidChangeCursorPosition((event) => {

      /* This function controls editable lines */
      // console.log('onDidChangeCursorPosition', event);
      if (this.options.hasCustomCode) {
        if (this.editableRegions?.length) {
          // Check if the current line is allowed
          const currentLineNumber = event.position.lineNumber;
          const isEditingAllowed = this.editableRegions.some((region) =>
            currentLineNumber >= region.startLine && currentLineNumber <= region.endLine);
          if (!isEditingAllowed) {
            // Prevent editing
            this._editor.updateOptions({
              readOnly: true,
              readOnlyMessage: {
                value: 'You can only edit the custom code sections. This line is ready only and managed by the Rapider AI configuration.'
              }
            });
          } else {
            // Allow editing for allowed line on a restricted editor mode
            if (this._editor) {
              this._editor.updateOptions({ readOnly: false });
            }
          }
        } else {
          // Prevent editing as there is no allowed lines
          this._editor.updateOptions({
            readOnly: true,
            readOnlyMessage: {
              value: 'This code is read only and managed by the Rapider AI configuration.'
            }
          });
        }
      }
    });

    this._editor.onDidBlurEditorWidget(() => {
      this.onTouched();
    });

    this.observeParentResize();

    this.init.emit(this._editor);
  }

}
