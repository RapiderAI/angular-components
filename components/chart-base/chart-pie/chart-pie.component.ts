import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { v4 as uuidv4 } from 'uuid';
import { RappiderHeadingModule } from '@rapider/angular-components/heading';
import { RappiderParagraphModule } from '@rapider/angular-components/paragraph';

@Component({
  selector: 'rappider-chart-pie',
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeadingModule,
    RappiderParagraphModule
  ],
  templateUrl: '../chart-base.component.html',
  styleUrls: ['../chart-base.component.scss', './chart-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RappiderChartPieComponent implements OnInit {

  @Input() config: any = {};
  @Input() content?: any = {};

  defaultHeight = 400;
  uniqueId: string = 'chartContainer_' + uuidv4().replace(/-/g, '');


  constructor() { }

  ngOnInit(): void {
    // set a default config
    const defaultConfig = {
      type: 'interval',
      autoFit: true,
      encode: { y: 'percent', color: 'item' },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', outerRadius: 0.8 },
      legend: {
        color: { position: 'bottom', layout: { justifyContent: 'center' } },
      },
      labels: [
        {
          position: 'outside',
          text: (data) => data?.item && data?.percent && data?.count ? `${data.item}: ${data.count} | ${data.percent * 100}%` : '',
        },
      ],
      tooltip: {
        items: [
          (data) => ({
            name: data.item,
            value: `${data.percent * 100}%`,
          }),
        ],
      },
    };

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
