import { SkeletonAvatarShape, SkeletonSizeAvatar } from "@rapider/angular-components/core/skeleton";

export interface SkeletonAvatarConfig {
  /**
   * Size of the avatar
   *
   * @type {SkeletonAvatarSize}
   * @memberof SkeletonAvatarConfig
   */
  size?: SkeletonSizeAvatar;

  /**
   * Shape of the avatar
   *
   * @type {SkeletonAvatarShape}
   * @memberof SkeletonAvatarConfig
   */
  shape?: SkeletonAvatarShape;
}