import { ModuleWithProviders, NgModule } from '@angular/core';
import { MONACO_EDITOR_CONFIG, MonacoEditorConfig } from './utils/monaco-editor.config';
import { MonacoEditorComponent } from './components/monaco-editor/monaco-editor.component';
import { CodeEditorComponent } from './code-editor.component';

@NgModule({
  imports: [
    MonacoEditorComponent,
    CodeEditorComponent
  ],
  exports: [
    MonacoEditorComponent,
    CodeEditorComponent
  ]
})
export class RappiderMonacoEditorModule {
  public static forRoot(config: MonacoEditorConfig = {}): ModuleWithProviders<RappiderMonacoEditorModule> {
    return {
      ngModule: RappiderMonacoEditorModule,
      providers: [
        { provide: MONACO_EDITOR_CONFIG, useValue: config }
      ]
    };
  }
}
