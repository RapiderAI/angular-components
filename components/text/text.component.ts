import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { TextMode } from '@rapider/angular-components/core/text';
import { ColorConfig } from '@rapider/angular-components/core/style';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'rappider-text',
  standalone: true,
  imports: [
    CommonModule,
    NzTypographyModule,
  ],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class RappiderTextComponent implements OnInit, OnChanges {
  @Input() textMode?: TextMode;
  // text content for html mode
  @Input() content: string;
  // text content for simple text mode
  @Input() text: string;
  @Input() typography: TypographyConfig;
  @Input() colorSettings: ColorConfig;

  public TextMode = TextMode;
  safeHTML: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  initData() {
    if (!this.textMode) {
      this.textMode = TextMode.Text;
    }
    if (this.content && this.textMode === TextMode.Html) {
      this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.content || this.text);
    }
  }

  ngOnInit() {
    this.initData();
  }

  ngOnChanges() {
    this.initData();
  }

}
