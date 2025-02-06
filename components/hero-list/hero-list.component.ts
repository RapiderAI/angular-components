import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponentConfig, RappiderHeroComponent } from '@rapider/angular-components/hero';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';


@Component({
  selector: 'rappider-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeroComponent,
    RappiderHeadingComponent,
    RappiderButtonComponent
  ],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class RappiderHeroListComponent {
  @Input() items: HeroComponentConfig[];
  @Input() gap: string;
  @Input() titles: HeadingComponentConfig[];
  @Input() button: ButtonComponentConfig;

  @Output() buttonConfirm = new EventEmitter();
  @Output() cardConfirm = new EventEmitter();

  onButtonConfirm() {
    this.buttonConfirm.emit();
  }

  onCardConfirm() {
    this.cardConfirm.emit();
  }
}
