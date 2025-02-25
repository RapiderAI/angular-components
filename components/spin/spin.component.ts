import { Component, HostBinding, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SpinOpacity, SpinSize } from '@rapider/angular-components/core/spin';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'rappider-spin',
  standalone: true,
  imports: [
    CommonModule,
    NzSpinModule,
  ],
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss'],
})
export class RappiderSpinComponent implements OnInit {

  @Input() delay: number;
  @Input() indicator: TemplateRef<void>;
  @Input() size: SpinSize;
  @Input() spinning: boolean;
  @Input() simple: boolean;
  @Input() tip: string;
  @Input() color: string;
  @Input() opacity: SpinOpacity;

  @HostBinding('style.--spin-background-color') backgroundColor;

  ngOnInit(): void {
    this.initDefaults();
  }

  initDefaults() {
    if (this.color) {
      this.backgroundColor = this.color;
    } else {
      this.backgroundColor = 'var(--primary-color)';
    }
    if (!this.opacity) {
      this.opacity = SpinOpacity.ModeratelyTransparent;
    }
  }
}
