import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { RappiderHeadingModule } from '@rapider/angular-components/heading';
import { RappiderParagraphModule } from '@rapider/angular-components/paragraph';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'rappider-chart-bar',
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeadingModule,
    RappiderParagraphModule
  ],
  templateUrl: '../chart-base.component.html',
  styleUrls: ['../chart-base.component.scss', './chart-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RappiderChartBarComponent implements OnInit {

  @Input() config: any = {};
  @Input() content?: any = {};

  defaultHeight = 400;
  uniqueId: string = 'chartContainer_' + uuidv4().replace(/-/g, '');


  constructor() { }

  ngOnInit(): void {
    // set a default config
    const defaultConfig = {};

    // merge default config with user config
    this.config = { ...defaultConfig, ...this.config };

    // render the chart
    setTimeout(() => {
      this.renderChart();
    }, 100);
  }

  renderChart(): void {
    const chart = new Chart({
      container: this.uniqueId,
      autoFit: true,
    });
    chart.options(this.config);
    chart.render();
  }

}
