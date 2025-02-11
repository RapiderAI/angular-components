import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ButtonComponentConfig, PRIMARY_SAVE_BUTTON_CONFIG } from '@rapider/angular-components/button';
import { CodeMirrorSettings } from '@rapider/angular-components/core/codemirror';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderCodeEditorComponent } from '@rapider/angular-components/code-editor-wrapper';

@Component({
  selector: 'rappider-code-editor-input-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RappiderButtonComponent,
    RappiderCodeEditorComponent
  ],
  templateUrl: './codemirror-input-form.component.html',
  styleUrls: ['./codemirror-input-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RappiderCodemirrorInputFormComponent implements OnInit {
  @Input() codemirrorTitle: string;
  /* button config input */
  @Input() button: ButtonComponentConfig;
  /* codemirror settings */
  @Input() codemirrorSettings: CodeMirrorSettings;
  /* any content written in codemirror component */
  @Input() codemirrorContent: string;
  /* additional buttons in codemirror toolbar */
  @Input() codemirrorAdditionalButtons: ButtonComponentConfig[];

  @Output() buttonClick = new EventEmitter<string>();
  @Output() codemirrorAdditionalButtonClick = new EventEmitter<ButtonComponentConfig>();

  ngOnInit(): void {
    this.setDefaultButton();
  }

  /**
   * set default button if there is no button input
   *
   * @memberof RappiderCodemirrorInputFormComponent
   */
  setDefaultButton() {
    if (!this.button) {
      this.button = PRIMARY_SAVE_BUTTON_CONFIG;
    }
  }

  /**
   * emits codemirror's content when the button is clicked
   *
   * @memberof RappiderCodemirrorInputFormComponent
   */
  onButtonClick() {
    this.buttonClick.emit(this.codemirrorContent);
  }

  onAdditionalButtonClick(button: ButtonComponentConfig) {
    this.codemirrorAdditionalButtonClick.emit(button);
  }

}
