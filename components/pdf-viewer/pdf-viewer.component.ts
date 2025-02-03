import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageViewMode } from '@rapider/angular-components/core/pdf-viewer';
import { NgxExtendedPdfViewerModule, PdfLoadedEvent, ProgressBarEvent, VerbosityLevel } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'rappider-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class RappiderPdfViewerComponent implements OnInit, OnChanges {

  /**
   * uri of the pdf
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() source: string;
  /**
   * Allows you to put the viewer's SVG files into an arbitrary folder.
   * default => './assets/images/'
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() imageResourcesPath: string;
  /**
   * Allows you to put the locale folder into an arbitrary folder.
   * default => './assets/locale/'
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() localeFolderPath: string;
  /**
   * Background color of the PDF viewer.
   * This setting affects the free area to the right and
   *  to the left hand side of the PDF file.
   *  default => #e8e8eb
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() backgroundColor: string;
  /**
   * Setting this flag to false disables printing the PDF file.
   * default => true
   *
   * @type {boolean}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() enablePrint: boolean;
  /**
   * Allows the user to define the name of the file after clicking "download"
   * default => document.pdf
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() filenameForDownload: string;
  /**
   * Setting this flag to true, activates the "hand tool" to scroll the PDF file by dragging.
   * Setting this to false activates the "text selection" tool.
   * You can also use this flag as a two-way binding attribute.
   * If you're only interested in the event, the event name is (handToolChange).
   * Deactivating this flag also activates the "text layer".
   * This, in turn, enables marking text and highlighting search result.
   * default => true
   *
   * @type {boolean}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() handTool: boolean;
  /**
   * Define the height of the PDF window. By default, it's 100%.
   * Unfortunately, on most web pages, 100% translates to a height of 0 pixels.
   * In this case, the height is set to fill all the available space.
   * More precisely, the all the space to the bottom of the window.
   * If that's less then 100 pixel, the height is set to 100 pixel.
   * Note that this is just an initial setting. It doesn't change when the window is resized.
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() height: string;
  /**
   * Language of the UI. Must the the complete locale name, such as "es-ES" or "es-AR". It may be all lowercase.
   * default => 'undefined'
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() language: string;
  /**
   * Show or hide the button to toggle the sidebar
   * default => true
   *
   * @type {boolean}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() showSidebarButton: boolean;
  /**
   * Increases the size of the UI elements so you can use them on small mobile devices.
   * Must be a percentage ('150%') or a floating-point number ('1.5').
   * Alternatively you can set this attribute to 'true' (= '150%') or 'false' (= '100%').
   * default => '100%'
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() mobileFriendlyZoom: string;
  /**
   * Two-way binding attribute to determine the page to display;
   * more precisely: [page]="25" makes the PDF viewer show page 25
   * (at any time - even after load time); [(page)]="attribute" updates
   * the attribute each time the user scrolls to another page. If you're only
   * interested in the event, that's (pageChange).
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() page: string;
  /**
   * Two-way binding attribute to determine the page to display; more precisely:
   * [pageLabel]="25" makes the PDF viewer show the page the author called page "25".
   * This may or may not be a numeric value. For instance, many books use roman numbers
   * for the preface and arab numbers for the rest of the document. In this case,
   * [pageLabe]="iv" usually refers to the same page as [page]="4". [(pageLabel)]="attribute"
   * updates the attribute each time the user scrolls to another page. If you're only interested
   * in the event, that's (pageLabelChange).
   *
   * @type {string}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() pageLabel: string;
  /**
   * pageViewMode="multiple" is the default PDF viewer. It shows the entire PDF files as a long roll of pages, just as Acrobat reader does.
   * pageViewMode="infinite-scroll" displays the entire PDF file without scrollbar.
   * pageViewMode="single" only displays one page at a time. You can't scroll to the next page.
   * The only way to navigate to another page is to click on the "next page/previous page" button, enter a page number,
   * jump to the next result of a search, and to click on an entry of the table of contents.
   * default => 'multiple'
   *
   * @type {PageViewMode}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() pageViewMode: PageViewMode;
  /**
   * Log level. Legal values:
   * VerbosityLevel.ERRORS (=0),
   * VerbosityLevel.WARNINGS (=1),
   * and VerbosityLevel.INFOS (=5).
   *
   * @type {VerbosityLevel}
   * @memberof RappiderPdfViewerComponent
   */
  @Input() logLevel: VerbosityLevel;
  @Input() showDownloadButton: boolean;
  @Input() showFindButton: boolean;
  @Input() showHandToolButton: boolean;
  @Input() showOpenFileButton: boolean;
  @Input() showPagingButtons: boolean;
  @Input() showPresentationModeButton: boolean;
  @Input() showPrintButton: boolean;
  @Input() showPropertiesButton: boolean;
  @Input() showRotateButton: boolean;
  @Input() showScrollingButton: boolean;
  @Input() showToolbar: boolean;
  @Input() showSecondaryToolbarButton: boolean;
  @Input() showSpreadButton: boolean;
  @Input() showZoomButtons: boolean;

  /**
   * Emits while the PDF file is loading (type="load") or printing (type="print"
   * Note that the events objects are slightly different between printing and loading.
   * To avoid confusion, check the type field of the ProgressBarEvent or rely on the field percent, which is populated in both cases.
   *
   * @memberof RappiderPdfViewerComponent
   */
  @Output() progress = new EventEmitter<ProgressBarEvent>();
  /**
   * Emits when the PDF file is going to load soon.
   *
   * @memberof RappiderPdfViewerComponent
   */
  @Output() pdfLoadingStarts = new EventEmitter<void>();
  /**
   * Emits when the PDF file has been load successfully.
   *
   * @memberof RappiderPdfViewerComponent
   */
  @Output() pdfLoaded = new EventEmitter<PdfLoadedEvent>();
  /**
   * Emits when trying to load and open a PDF file has failed.
   *
   * @memberof RappiderPdfViewerComponent
   */
  @Output() pdfLoadingFailed = new EventEmitter<Error>();
  /**
   * Fires when a user downloads a document. Strictly speaking, it fires when they click the "download" button.
   * Even if the user cancels the download, the event is fired.
   *
   * @memberof RappiderPdfViewerComponent
   */
  @Output() pdfDownloaded = new EventEmitter<void>();

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  initDefaults(): void {
    if (!this.height) {
      this.height = '100%';
    }
    if (this.showToolbar == null) {
      this.showToolbar = true;
    }
    if (this.showSidebarButton == null) {
      this.showSidebarButton = true;
    }
    if (this.showSecondaryToolbarButton == null) {
      this.showSecondaryToolbarButton = true;
    }
    if (this.showFindButton == null) {
      this.showFindButton = true;
    }
    if (this.showHandToolButton == null) {
      this.showHandToolButton = true;
    }
    if (this.showOpenFileButton == null) {
      this.showOpenFileButton = false;
    }
    if (this.showPagingButtons == null) {
      this.showPagingButtons = true;
    }
    if (this.showPresentationModeButton == null) {
      this.showPresentationModeButton = true;
    }
    if (this.showRotateButton == null) {
      this.showRotateButton = true;
    }
    if (this.showScrollingButton == null) {
      this.showScrollingButton = true;
    }
    if (this.showSpreadButton == null) {
      this.showSpreadButton = true;
    }
    if (this.showZoomButtons == null) {
      this.showZoomButtons = true;
    }
    if (this.pageViewMode == null) {
      this.pageViewMode = PageViewMode.Multiple;
    }
    if (this.logLevel == null) {
      this.logLevel = VerbosityLevel.ERRORS;
    }
  }

  onProgress(event: ProgressBarEvent) {
    this.progress.emit(event);
  }

  onPdfLoadingStarts() {
    this.pdfLoadingStarts.emit();
  }

  onPdfLoaded(event: PdfLoadedEvent) {
    this.pdfLoaded.emit(event);
  }

  onPdfLoadingFailed(event: Error) {
    this.pdfLoadingFailed.emit(event);
  }

  onPdfDownloaded() {
    this.pdfDownloaded.emit();
  }

}
