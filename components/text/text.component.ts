import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
  textMode = input<TextMode>(TextMode.Text);
  content = input<string>('');
  text = input<string>();
  typography = input<TypographyConfig>();
  colorSettings = input<ColorConfig>();

  protected readonly TextMode = TextMode;

  protected readonly safeHTML = computed(() => {
    if (this.textMode() === TextMode.Html) {
      return this.sanitizer.bypassSecurityTrustHtml(this.content());
    }
    return undefined;
  });

  constructor(private sanitizer: DomSanitizer) { }
}