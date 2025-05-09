import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { v4 as uuidv4 } from 'uuid';
import { RappiderHeadingModule } from '@rapider/angular-components/heading';
import { RappiderParagraphModule } from '@rapider/angular-components/paragraph';

@Component({
  selector: 'rappider-chart-line',
  standalone: true,
  imports: [
    CommonModule,
    RappiderHeadingModule,
    RappiderParagraphModule
  ],
  templateUrl: '../chart-base.component.html',
  styleUrls: ['../chart-base.component.scss', './chart-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RappiderChartLineComponent implements OnInit {

  @Input() config: any = {};
  @Input() content?: any = {};

  @Input() defaultShapeField? = 'square';
  @Input() defaultLineWidth? = 2;
  @Input() chartPointFillColor? = 'white';
  defaultHeight = 400;
  uniqueId: string = 'chartContainer_' + uuidv4().replace(/-/g, '');


  constructor() { }

  ngOnInit(): void {
    // set a default config
    const defaultConfig = {
      autoFit: true,
      point: {
        shapeField: this.defaultShapeField,
        sizeField: 4,
      },
      interaction: {
        tooltip: {
          marker: false,
        },
      },
      style: {
        lineWidth: this.defaultLineWidth,
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
