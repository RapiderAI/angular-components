import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponentConfig, RappiderAvatarComponent } from '@rapider/angular-components/avatar';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { IconBlockMode } from '@rapider/angular-components/icon-block';
import { TextComponentConfig, RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';


@Component({
  selector: 'rappider-icon-block',
  standalone: true,
  imports: [
    CommonModule,
    RappiderAvatarComponent,
    RappiderHeadingComponent,
    RappiderTextComponent,
  ],
  templateUrl: './icon-block.component.html',
  styleUrls: ['./icon-block.component.scss']
})
export class RappiderIconBlockComponent implements OnInit, OnChanges {

  /* avatar */
  @Input() avatar: AvatarComponentConfig;
  /* title */
  @Input() title: HeadingComponentConfig;
  /* content */
  @Input() content: TextComponentConfig;
  /* mode */
  @Input() mode: IconBlockMode;

  IconBlockModes = IconBlockMode;

  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (!this.mode) {
      this.mode = IconBlockMode.Mode1;
    }
  }

}
