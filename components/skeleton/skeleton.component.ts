import { Component, Input } from '@angular/core';
import { SkeletonAvatarShape, SkeletonType, SkeletonElementSize, SkeletonElementButtonShape } from '@rapider/angular-components/core/skeleton';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'rappider-skeleton',
  templateUrl: './skeleton.component.html',
  imports:[
    CommonModule,
    NzSkeletonModule
  ],
  standalone: true,
  styleUrls: ['./skeleton.component.scss']
})

export class RappiderSkeletonComponent {

  /**
   *Type of the skeleton component
   *
   * @type {SkeletonType}
   * @memberof RappiderSkeletonComponent
   * @default default
   */
  @Input() skeletonType: SkeletonType;

  /**
   * Active status of the skeleton component
   *
   * @type {boolean}
   * @memberof RappiderSkeletonComponent
   * @default true
   */
  @Input() active: boolean;

  /**
   * Avatar configuration for the skeleton component
   *
   * @type {boolean}
   * @memberof RappiderSkeletonComponent
   * @default false
   */
  @Input() showAvatar: boolean;

  /**
   * Loading status of the skeleton component
   *
   * @type {boolean}
   * @memberof RappiderSkeletonComponent
   * @default true
   */
  @Input() loading: boolean;

  /**
   * Paragraph configuration for the skeleton component
   *
   * @type {boolean}
   * @memberof RappiderSkeletonComponent
   * @default true
   */
  @Input() showParagraph: boolean;

  /**
   * Title configuration for the skeleton component
   *
   * @type {boolean}
   * @memberof RappiderSkeletonComponent
   * @default true
   */
  @Input() showTitle: boolean;

  /**
   * Round status of the skeleton component
   *
   * @type {boolean}
   * @memberof RappiderSkeletonComponent
   * @default true
   */
  @Input() round: boolean;

  SkeletonType = SkeletonType;
  elementSize: SkeletonElementSize.Default;
  avatarShape: SkeletonAvatarShape.Square;
  buttonShape: SkeletonElementButtonShape.Default;

  get avatarConfig(): SkeletonAvatarShape | false {
    return this.showAvatar ? SkeletonAvatarShape.Circle : false;
  }
}
