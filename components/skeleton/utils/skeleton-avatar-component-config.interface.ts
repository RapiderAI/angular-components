import { SkeletonAvatarShape, SkeletonSizeAvatar } from "@rapider/angular-components/core/skeleton";

export interface SkeletonAvatarComponentConfig {
  /**
   * Size of the avatar
   *
   * @type {SkeletonAvatarSize}
   * @memberof SkeletonAvatarComponentConfig
   */
  size?: SkeletonSizeAvatar;

  /**
   * Shape of the avatar
   *
   * @type {SkeletonAvatarShape}
   * @memberof SkeletonAvatarComponentConfig
   */
  shape?: SkeletonAvatarShape;
}