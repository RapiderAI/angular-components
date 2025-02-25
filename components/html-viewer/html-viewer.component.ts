import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'rappider-html-viewer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RappiderHtmlViewerComponent implements OnInit, OnChanges {

  @Input() html: string;

  safeHTML: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.html);
  }

  ngOnChanges() {
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.html);
  }

}
