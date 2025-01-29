import { Component, Input } from '@angular/core';
import { AnimationLoader, AnimationOptions, LottieComponent, provideLottieOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rappider-lottie-player',
  templateUrl: './lottie-player.component.html',
  imports: [
    CommonModule,
    LottieComponent
  ],
  standalone: true,
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    AnimationLoader,
  ],
  styleUrls: ['./lottie-player.component.scss']
})
export class RappiderLottiePlayerComponent {

  @Input() options: AnimationOptions;
  @Input() width: string;
  @Input() height: string;
  @Input() styles: Partial<CSSStyleDeclaration>;
  @Input() containerClass: string;

}
