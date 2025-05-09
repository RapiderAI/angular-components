import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { ChartConfig } from '@rapider/angular-components/core/chart';
import { ChartContent } from '@rapider/angular-components/core/chart';
import { v4 as uuidv4 } from 'uuid';
import { convertChartConfigToG2Spec } from '@rapider/angular-components/core/chart';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { RappiderParagraphComponent } from '@rapider/angular-components/paragraph';

@Component({
  selector: 'rappider-chart-base',
  templateUrl: '../chart-base/chart-base.component.html',
  styleUrls: ['./chart-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeadingComponent,
    RappiderParagraphComponent
  ]
})
export class RappiderChartBaseComponent implements OnInit {
  @Input() config: ChartConfig;
  @Input() content?: ChartContent;

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
    const g2SpecConfig = convertChartConfigToG2Spec(this.config);
    chart.options(g2SpecConfig);
    chart.render();
  }
}
