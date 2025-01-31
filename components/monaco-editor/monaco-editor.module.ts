import { NgModule } from '@angular/core';
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
export class RappiderMonacoEditorModule {}
