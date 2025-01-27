import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderAvatarComponent } from '@rapider/angular-components/avatar';
import { AvatarComponentConfig } from '@rapider/angular-components/avatar/utils';
import { IconBlockMode } from'@rapider/angular-components/core/icon-block';
import { RappiderHeadingComponent, HeadingComponentConfig } from '@rapider/angular-components/heading';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';


@Component({
  selector: 'rappider-icon-block',
  standalone: true,
  imports: [
    CommonModule,
    RappiderAvatarComponent,
    RappiderHeadingComponent,
    RappiderTextComponent
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
