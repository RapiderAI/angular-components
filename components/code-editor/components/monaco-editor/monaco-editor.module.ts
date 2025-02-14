import { ModuleWithProviders, NgModule } from '@angular/core';
import { MONACO_EDITOR_CONFIG, MonacoEditorConfig } from './utils/index';
import { MonacoEditorComponent } from './monaco-editor.component';

@NgModule({
  imports: [MonacoEditorComponent],
  exports: [MonacoEditorComponent]
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
