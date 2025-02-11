import { Component, Input } from '@angular/core';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { Tag } from '@rapider/angular-components/core/tag';
import { TagListDirectionMode } from '@rapider/angular-components/core/tag-list';
import { CommonModule } from '@angular/common';
import { RappiderTagComponent } from '@rapider/angular-components/tag';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';

@Component({
  selector: 'rappider-tag-list',
  templateUrl: './tag-list.component.html',
  imports:[
    CommonModule,
    RappiderTagComponent,
    RappiderHeadingComponent
  ],
  standalone: true,
  styleUrls: ['./tag-list.component.scss']
})
export class RappiderTagListComponent {

  @Input() titles: HeadingComponentConfig[];
  @Input() items: Tag[];
  @Input() directionMode: TagListDirectionMode;
}
