import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TypographyConfig } from "../core/typography/typography-config.interface";
import { TextMode } from "../core/text/text-mode.enum";
import { ColorConfig } from "../core/color/color-config.interface";


@Component({
  selector: 'text-component',
  standalone: true,
  imports: [
    CommonModule,
    NzTypographyModule
  ],
  template: `
    @if (textMode() === TextMode.Html) {
      <div class="html-mode">
        <span [innerHTML]="safeHTML()"
              nz-typography></span>
      </div>
    } @else if (textMode() === TextMode.Text) {
      <div class="simple-text-mode">
        <p [ngStyle]="{
          'font-size': typography()?.fontSize,
          'font-weight': typography()?.fontWeight,
          'font-style': typography()?.fontStyle,
          'text-align': typography()?.textAlign,
          'text-shadow': typography()?.textShadow,
          'font-family': typography()?.fontFamily,
          'font-stretch': typography()?.fontStretch,
          'text-indent': typography()?.textIndent,
          'letter-spacing': typography()?.letterSpacing,
          'line-height': typography()?.lineHeight,
          'word-spacing': typography()?.wordSpacing,
          'text-decoration': typography()?.textDecoration,
          'text-transform': typography()?.textTransform,
          'user-select': typography()?.userSelect,
          'background-color': colorSettings()?.backgroundColor,
          'color': colorSettings()?.color
        }">
          @defer (on viewport) {
            {{ text() }}
          } @placeholder {
            <span>Loading text...</span>
          }
        </p>
      </div>
    }
  `,
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