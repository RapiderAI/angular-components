import { TrackKind } from '@rapider/angular-components/core/media-player';

export interface MediaPlayerTrack {
  /**
   * How the text track is meant to be used.
   * If omitted the default kind is subtitles.
   * If the attribute is not present, it will use the subtitles.
   * If the attribute contains an invalid value, it will use metadata.
   *
   * @type {TrackKind}
   * @memberof MediaPlayerTrack
   */
  kind: TrackKind;
  /**
   * Address of the track (.vtt file). Must be a valid URL.
   * This attribute must be specified and its URL value must have
   * the same origin as the document — unless the <audio> or <video>
   * parent element of the track element has a crossorigin attribute.
   *
   * @type {string}
   * @memberof MediaPlayerTrack
   */
  source: string;
  /**
   * Language of the track text data. It must be a valid BCP 47 language tag.
   * If the kind attribute is set to subtitles,
   * then srclang must be defined.
   *
   * @type {string}
   * @memberof MediaPlayerTrack
   */
  sourceLanguage?: string;
  /**
   * A user-readable title of the text track which is used by the browser when listing available text tracks.
   *
   * @type {string}
   * @memberof MediaPlayerTrack
   */
  label: string;
  /**
   * This attribute indicates that the track should be enabled unless the user's
   * preferences indicate that another track is more appropriate.
   * This may only be used as true on one track element per media element.
   *
   * @type {boolean}
   * @memberof MediaPlayerTrack
   */
  isDefault?: boolean;
}