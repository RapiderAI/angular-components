import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef, OnChanges, OnInit } from '@angular/core';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { ImageComponentConfig, RappiderImageComponent } from '@rapider/angular-components/image';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { IconComponentConfig, RappiderIconComponent } from '@rapider/angular-components/icon';
import { IconType } from '@rapider/angular-components/core/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';

/* TODO: Add this component to the Rappider components */
@Component({
  selector: 'rappider-card-ccs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    RappiderHeadingComponent,
    RappiderButtonComponent,
    RappiderTextComponent,
    RappiderImageComponent,
    RappiderIconComponent
  ],
  templateUrl: './card-ccs.component.html',
  styleUrls: ['./card-ccs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RappiderCardCcsComponent implements OnInit, OnChanges {

  /* data that will be passed and emitted by the item click */
  @Input() data: any;
  /* title */
  @Input() title: HeadingComponentConfig;
  /* subtitles as array */
  @Input() subtitles: HeadingComponentConfig[];
  /* description */
  @Input() description: TextComponentConfig;
  /* image as cover picture, not the backgound cover but above the title */
  @Input() image: ImageComponentConfig;
  /* cover template instead of image, if you pass image input data, this input will not be displayed */
  @Input() thumbnailTemplate: TemplateRef<any>;
  /* first action button */
  @Input() firstActionButton: ButtonComponentConfig;
  /* second action button */
  @Input() secondActionButton: ButtonComponentConfig;
  /* third action button */
  @Input() thirdActionButton: ButtonComponentConfig;
  /* a color band that adds a colored div at the top of the card content */
  @Input() colorBand?: string;
  @Input() selectedCardIcon: IconComponentConfig;
  @Input() selected: boolean;

  /* card item select/click */
  @Output() itemSelect = new EventEmitter<any>();
  /* action button click  */
  @Output() actionClick = new EventEmitter();

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  actionClicked(button: ButtonComponentConfig) {
    this.actionClick.emit({ button: button, data: this.data });
  }

  itemClicked() {
    this.itemSelect.emit(this.data);
  }

  initDefaults() {
    if (!this.selectedCardIcon) {
      this.selectedCardIcon = {
        name: 'fa-solid fa-circle-check',
        type: IconType.FontAwesome
      };
    }
    if (this.selected == null) {
      this.selected = false;
    }
  }
}
