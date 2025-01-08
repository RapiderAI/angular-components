import { CommonModule } from "@angular/common";
import { Component, effect, input, signal } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TypographyConfig } from '@rapider/angular-components/core/typography';
import { TextMode } from '@rapider/angular-components/core/text';
import { ColorConfig } from '@rapider/angular-components/core/style';

@Component({
  selector: 'rpd-text',
  standalone: true,
  imports: [
    CommonModule,
    NzTypographyModule
  ],
  templateUrl: './text.component.html',
})
export class TextComponent {

  /* inputs */
  textMode = input<TextMode | string>(TextMode.Text);
  content = input<string>('');
  // Signal for safe HTML
  safeHTML = signal<SafeHtml>('');
  text = input<string>();
  typography = input<TypographyConfig>();
  colorSettings = input<ColorConfig>();

  protected readonly TextMode = TextMode;

  constructor(private sanitizer: DomSanitizer) {
    effect(() => {
      this.updateSafeHtml(this.content());
    });
  }

  private updateSafeHtml(htmlContent: string) {
    if (this.textMode() === TextMode.Html) {
      this.safeHTML.set(
        this.sanitizer.bypassSecurityTrustHtml(htmlContent)
      );
    }
  }
}