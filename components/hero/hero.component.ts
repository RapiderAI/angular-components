import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { HeroHorizontalContentPlacement, HeroVerticalContentPlacement } from '@rapider/angular-components/core/hero';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { ImageComponentConfig, RappiderImageComponent } from '@rapider/angular-components/image';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';

@Component({
  selector: 'rappider-hero',
  standalone: true,
  imports: [
    CommonModule,
    RappiderButtonComponent,
    RappiderHeadingComponent,
    RappiderTextComponent,
    RappiderImageComponent
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class RappiderHeroComponent {

  /* image for background */
  @Input() backgroundImage: ImageComponentConfig;
  /* line's background color class */
  @Input() lineBackgroundColor: string;
  /* line's width */
  @Input() lineWidth = '50px';
  /* line's height */
  @Input() lineHeight = '3px';
  /* hero's content can take inner html */
  @Input() content: TextComponentConfig;
  /* hero's title can take inner html */
  @Input() title: HeadingComponentConfig;
  /* hero's button */
  @Input() button: ButtonComponentConfig;
  /* hero's content horizontal placement */
  @Input() horizontalContentPlacement: HeroHorizontalContentPlacement;
  /* hero's content vertical placement */
  @Input() verticalContentPlacement: HeroVerticalContentPlacement;

  /* button click trigger */
  @Output() buttonClick = new EventEmitter();

  onButtonClick() {
    this.buttonClick.emit();
  }

}
