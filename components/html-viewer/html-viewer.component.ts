import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation, signal, effect } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'rpd-html-viewer',
  imports: [
    CommonModule,
  ],
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class HtmlViewerComponent {
  html = input<string>('');

  // Signal for safe HTML
  safeHTML = signal<SafeHtml>('');

  constructor(
    private sanitizer: DomSanitizer
  ) {
    // Subscribe to html input changes
    effect(() => {
      this.updateSafeHtml(this.html());
    });
  }

  private updateSafeHtml(htmlContent: string) {
    this.safeHTML.set(
      this.sanitizer.bypassSecurityTrustHtml(htmlContent)
    );
  }
}