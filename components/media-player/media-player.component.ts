import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { MediaPlayerProvider } from '@rapider/angular-components/core/media-player';
import 'vidstack/player';
import 'vidstack/player/layouts/default';
import 'vidstack/player/ui';
import {
  MediaAbortEvent,
  MediaAudioGainChangeEvent,
  MediaAudioTrackChangeEvent,
  MediaAudioTracksChangeEvent,
  MediaAutoPlayChangeEvent,
  MediaAutoPlayEvent,
  MediaAutoPlayFailEvent,
  MediaControlsChangeEvent,
  MediaCrossOrigin,
  MediaDurationChangeEvent,
  MediaEmptiedEvent,
  MediaEndedEvent,
  MediaEndEvent,
  MediaErrorEvent,
  MediaFullscreenChangeEvent,
  MediaKeyShortcuts,
  MediaLoadStartEvent,
  MediaPauseEvent,
  MediaPIPChangeEvent,
  MediaPlayEvent,
  MediaPlayingEvent,
  MediaQualityChangeEvent,
  MediaRateChangeEvent,
  MediaSeekedEvent,
  MediaSeekingEvent,
  MediaSrc,
  MediaStorage,
  MediaTimeChangeEvent,
  MediaTypeChangeEvent,
  MediaVolumeChangeEvent,
  ScreenOrientationLockType
} from 'vidstack';
import { defineCustomElement, MediaPlayerElement } from 'vidstack/elements';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'rappider-media-player',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class RappiderMediaPlayerComponent implements OnInit, OnChanges {

  // #Inputs Region

  /**
   * The artist or channel name for which this content belongs to.
   * This can be used in your layout and it will be included in the Media Session API.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() artist: string;

  /**
   * Images to be included in the Media Session API.
   *
   * @type {MediaImage[]}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() artwork: MediaImage[];

  /**
   * Whether playback should automatically begin as soon as
   * enough media is available to do so without interruption.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() autoPlay: boolean;

  /**
   * Limit playback to only play before a certain time.
   * Playback will end at this time.
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() clipEndTime: number;

  /**
   * Limit playback to only play after a certain time.
   * Playback will being from this time.
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() clipStartTime: number;

  /**
   * Indicates whether a user interface should be shown for controlling the resource.
   * Set this to false when you want to provide your own custom controls,
   * and true if you want the current provider to supply its own default controls.
   * Depending on the provider, changing this prop may cause the player to completely reset.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() controls: boolean;

  /**
   * The default amount of delay in milliseconds
   * while media playback is progressing without user activity
   * to indicate an idle state and hide controls.
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() controlsDelay: number;

  /**
   * Defines how the media element handles cross-origin requests,
   * thereby enabling the configuration of the CORS requests for the element's fetched data.
   *
   * @type {(boolean | MediaCrossOrigin)}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() crossOrigin: boolean | MediaCrossOrigin;

  /**
   * A double indicating the current playback time in seconds.
   * Defaults to 0 if the media has not started to play and has not seeked.
   * Setting this value seeks the media to the new time.
   * The value can be set to a minimum of 0 and maximum of the total length of the media (indicated by the duration prop).
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() currentTime: number;

  /**
   * A double indicating the total playback length of the media in seconds.
   * If this is not provided it will be determined when the media loaded.
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() duration: number;

  /**
   * This method will indicate the orientation to lock the screen
   * to when in fullscreen mode and the Screen Orientation API is available.
   *
   * @type {ScreenOrientationLockType}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() fullscreenOrientation: ScreenOrientationLockType;

  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player container.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() hideControlsOnMouseLeave: boolean;

  /**
   * Whether keyboard support is disabled for the media player globally.
   * This property won't disable standard ARIA keyboard controls for individual components when focused.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() keyDisabled: boolean;

  /**
   * Extends global media player keyboard shortcuts.
   * The shortcuts can be specified as a space-separated list of combinations
   * (e.g., p Control+Space), array, or callbacks.
   * See the provided doc link for more information.
   * Do note, if aria-keyshortcuts is specified on a component
   * then it will take precedence over the respective value set here.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() keyShortcuts: MediaKeyShortcuts; // FIX ME LATER

  /**
   * The number of seconds that currentTime can be behind liveEdgeStart and still be considered at the edge.
   * The default value is 10, meaning the user can be up to 10 seconds behind the live edge start and still be considered live.
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() liveEdgeTolerance: number;

  /**
   * Whether media should automatically start playing from the beginning (replay) every time it ends.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() loop: boolean;

  /**
   * Whether the audio is muted or not.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() muted: boolean;

  /**
   * Whether playback should be paused.
   * Defaults to true if no media has loaded or playback has not started.
   * Setting this to false will begin/resume playback.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() paused: boolean;

  /**
   * Sets the rate at which the media is being played back.
   * This is used to implement user controls for fast forward, slow motion, and so forth.
   * The normal playback rate is multiplied by this value to obtain the current rate, so a value of 1.0 indicates normal speed.
   *
   * Examples:
   * 0.5 = slow down to 50% of the normal speed
   * 1.5 = speed up normal speed by 50%
   * 2 = double the normal speed
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() playbackRate: number;

  /**
   * Whether the video is to be played "inline", that is within the element's playback area.
   * Note that setting this to false does not imply that the video will always be played in fullscreen.
   * Depending on the provider, changing this prop may cause the player to completely reset.
   *
   * @type {boolean}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() playsInline: boolean;

  /**
   * The URL of the current poster.
   * Defaults to '' if no media/poster has been given or loaded.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() poster: string;

  /**
   * Indicates when the player can begin loading the poster.
   *
   * eager: poster will be loaded immediately.
   * idle: poster will be loaded after the page has loaded and requestIdleCallback is fired.
   * visible: poster will delay loading until the provider has entered the viewport.
   * custom: poster will wait for the startLoadingPoster() method or media-poster-start-loading event.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() posterLoad: string;

  /**
   * Determines whether volume, time, and other player settings
   * should be saved to storage and used when initializing media.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() storage: MediaStorage;

  /**
   * The current media stream type.
   * This value helps determine what type of UI should be displayed
   * and whether seeking operations are permitted during live streams.
   * If seeking is permitted, set this value to live:dvr or ll-live:dvr.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() streamType: string;

  /**
   * The URL and optionally type of the current media resource/s to be considered for playback.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() source: MediaSrc | MediaSrc[];

  /**
   * The title of the current media.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() mediaTitle: string;

  /**
   * The type of player view that should be used (i.e., audio or video).
   * By default this is set to video.
   *
   * @type {string}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() viewType: string;

  /**
   * An int between 0 (silent) and 1 (loudest) indicating the audio volume. Defaults to 1.
   *
   * @type {number}
   * @memberof RappiderMediaPlayerComponent
   */
  @Input() volume: number;

  // End of Inputs Region

  // Outputs Region

  /**
   * Fired when the resource was not fully loaded, but not as the result of an error.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() abort = new EventEmitter<MediaAbortEvent>();

  /**
   * Fired when the audio gain has changed. The event detail contains the new gain.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() audioGainChange = new EventEmitter<MediaAudioGainChangeEvent>();

  /**
   * Fired when the current audio track changes.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() audioTrackChange = new EventEmitter<MediaAudioTrackChangeEvent>();

  /**
   * Fired when an audio track has been added or removed.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() audioTracksChange = new EventEmitter<MediaAudioTracksChangeEvent>();

  /**
   * Fired when an auto-play attempt has successfully been made (ie: media playback has automatically started).
   * The event detail whether media is muted before any attempts are made.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() autoPlayEvent = new EventEmitter<MediaAutoPlayEvent>();

  /**
   * Fired when the autoPlay property has changed value.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() autoPlayChange = new EventEmitter<MediaAutoPlayChangeEvent>();

  /**
   * Fired when an auto-play attempt has failed.
   * The event detail contains the error that had occurred on the last auto-play attempt which caused it to fail.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() autoPlayFail = new EventEmitter<MediaAutoPlayFailEvent>();

  /**
   * Fired when controls visibility changes.
   * The controls are idle/hidden when playback is progressing (playing),
   * and there is no user activity for a set period of time (default is 2.5s).
   * The event detail contains whether the controls are visible or not.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() controlsChange = new EventEmitter<MediaControlsChangeEvent>();

  /**
   * Fired when the duration property changes.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() durationChange = new EventEmitter<MediaDurationChangeEvent>();

  /**
   * Fired when the media has become empty.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() emptied = new EventEmitter<MediaEmptiedEvent>();

  /**
   * Fired each time media playback has reached the end.
   * This is fired even if the loop property is true,
   * which is generally when you'd reach for this event over the MediaEndedEvent if you want to be notified of media looping.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() end = new EventEmitter<MediaEndEvent>();

  /**
   * Fired when playback or streaming has stopped because
   * the end of the media was reached or because no further data is available.
   * This is not fired if playback will start from the beginning again due to the loop property being true
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() ended = new EventEmitter<MediaEndedEvent>();

  /**
   * Fired when media loading or playback has encountered any issues (for example, a network connectivity problem).
   * The event detail contains a potential message containing more information about the error
   * (empty string if nothing available), and a code that identifies the general type of error that occurred.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() error = new EventEmitter<MediaErrorEvent>();

  @Output() fullScreenChange = new EventEmitter<MediaFullscreenChangeEvent>();

  /**
   * Fired when the browser has started to load a resource.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() loadStart = new EventEmitter<MediaLoadStartEvent>();

  /**
   * Fired when the media property changes value.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() mediaTypeChange = new EventEmitter<MediaTypeChangeEvent>();

  /**
   * Fired when a request to pause an activity is handled and the activity has entered its paused state,
   * most commonly after the media has been paused through a call to the pause() method.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() pause = new EventEmitter<MediaPauseEvent>();

  /**
   * Fired when media enters/exits picture-in-picture (PIP) mode.
   * The event detail is a boolean indicating if PIP was entered (true) or exited (false).
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() pipChange = new EventEmitter<MediaPIPChangeEvent>();

  /**
   * Fired when the paused property is changed from true to false, as a result of the play() method, or the autoPlay property.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() play = new EventEmitter<MediaPlayEvent>();

  /**
   * Fired when playback is ready to start after having been paused or delayed due to lack of data.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() playing = new EventEmitter<MediaPlayingEvent>();

  /**
   * Fired when the current video quality/rendition has changed.
   * The event detail will be null if video quality information is not available.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() qualityChange = new EventEmitter<MediaQualityChangeEvent>();

  /**
   * Fired when the playback rate has changed.
   * The event detail contains the new rate.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() rateChange = new EventEmitter<MediaRateChangeEvent>();

  /**
   * Fired when a seek operation starts, meaning the seeking property has changed to true and the media is seeking to a new position.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() seeking = new EventEmitter<MediaSeekingEvent>();

  /**
   * Fired when a seek operation completed, the current playback position has changed, and the seeking property is changed to false.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() seeked = new EventEmitter<MediaSeekedEvent>();

  /**
   * Fired when the currentTime property value changes.
   * The event detail contains the real time of media playback without accounting for any clipping.
   * This is also known as the provider time.
   * Listen to the time update event for the displayed time.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() timeChange = new EventEmitter<MediaTimeChangeEvent>();

  /**
   * Fired when the volume or muted properties change value.
   *
   * @memberof RappiderMediaPlayerComponent
   */
  @Output() volumeChange = new EventEmitter<MediaVolumeChangeEvent>();

  // Outputs Region


  Provider = MediaPlayerProvider;

  visible = true;

  ngOnInit() {
    defineCustomElement(MediaPlayerElement);
    this.initDefaults();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initDefaults();
    /* update view when source is changed. */
    if (changes['src']) {
      this.visible = false;
      setTimeout(() => this.visible = true, 1);
    }
  }

  initDefaults() {
    if (this.autoPlay == null) {
      this.autoPlay = false;
    }

    if (this.clipEndTime == null) {
      this.clipEndTime = 0;
    }

    if (this.clipStartTime == null) {
      this.clipStartTime = 0;
    }

    if (this.controls == null) {
      this.controls = true;
    }

    if (this.controlsDelay == null) {
      this.controlsDelay = 2000;
    }

    if (this.currentTime == null) {
      this.currentTime = 0;
    }

    if (this.duration == null) {
      this.duration = -1;
    }

    if (this.fullscreenOrientation == null) {
      this.fullscreenOrientation = 'landscape';
    }

    if (this.hideControlsOnMouseLeave == null) {
      this.hideControlsOnMouseLeave = false;
    }

    if (this.keyDisabled == null) {
      this.keyDisabled = false;
    }

    if (this.liveEdgeTolerance == null) {
      this.liveEdgeTolerance = 10;
    }

    if (this.loop == null) {
      this.loop = false;
    }

    if (this.muted == null) {
      this.muted = false;
    }

    if (this.paused == null) {
      this.paused = true;
    }

    if (this.playbackRate == null) {
      this.playbackRate = 1;
    }

    if (this.playsInline == null) {
      this.playsInline = false;
    }

    if (this.posterLoad == null) {
      this.posterLoad = 'visible';
    }

    if (this.streamType == null) {
      this.streamType = 'unknown';
    }

    if (this.viewType == null) {
      this.viewType = 'unknown';
    }

    if (this.volume == null || this.volume < 0 || this.volume > 100) {
      this.volume = 1;
    } else if (this.volume > 1) {
      this.volume = this.volume / 100;
    }
  }

  // Events

  onAbort(event: MediaAbortEvent) {
    this.abort.emit(event);
  }

  onAudioGainChange(event: MediaAudioGainChangeEvent) {
    this.audioGainChange.emit(event);
  }

  onAudioTrackChange(event: MediaAudioTrackChangeEvent) {
    this.audioTrackChange.emit(event);
  }

  onAudioTracksChange(event: MediaAudioTracksChangeEvent) {
    this.audioTracksChange.emit(event);
  }

  onAutoPlay(event: MediaAutoPlayEvent) {
    this.autoPlayEvent.emit(event);
  }

  onAutoPlayChange(event: MediaAutoPlayChangeEvent) {
    this.autoPlayChange.emit(event);
  }

  onAutoPlayFail(event: MediaAutoPlayFailEvent) {
    this.autoPlayFail.emit(event);
  }

  onControlsChange(event: MediaControlsChangeEvent) {
    this.controlsChange.emit(event);
  }

  onDurationChange(event: MediaDurationChangeEvent) {
    this.durationChange.emit(event);
  }

  onEmptied(event: MediaEmptiedEvent) {
    this.emptied.emit(event);
  }

  onEnd(event: MediaEndEvent) {
    this.end.emit(event);
  }

  onEnded(event: MediaEndedEvent) {
    this.ended.emit(event);
  }

  onError(event: MediaErrorEvent) {
    this.error.emit(event);
  }

  onFullScreenChange(event: MediaFullscreenChangeEvent) {
    this.fullScreenChange.emit(event);
  }

  onLoadStart(event: MediaLoadStartEvent) {
    this.loadStart.emit(event);
  }

  onMediaTypeChange(event: MediaTypeChangeEvent) {
    this.mediaTypeChange.emit(event);
  }

  onPaused(event: MediaPauseEvent) {
    this.pause.emit(event);
  }

  onPipChange(event: MediaPIPChangeEvent) {
    this.pipChange.emit(event);
  }

  onPlay(event: MediaPlayEvent) {
    this.play.emit(event);
  }

  onPlaying(event: MediaPlayingEvent) {
    this.play.emit(event);
  }

  onQualityChange(event: MediaQualityChangeEvent) {
    this.qualityChange.emit(event);
  }

  onRateChange(event: MediaRateChangeEvent) {
    this.rateChange.emit(event);
  }

  onSeeking(event: MediaSeekingEvent) {
    this.seeking.emit(event);
  }

  onSeeked(event: MediaSeekedEvent) {
    this.seeked.emit(event);
  }

  onTimeChange(event: MediaTimeChangeEvent) {
    this.timeChange.emit(event);
  }

  onVolumeChange(event: MediaVolumeChangeEvent) {
    this.volumeChange.emit(event);
  }
}
