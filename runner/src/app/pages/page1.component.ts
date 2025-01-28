import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { IconComponentConfig } from '@rapider/angular-components/icon';
import { IconType } from '@rapider/angular-components/core/icon';
import { AccordionPanel } from '@rapider/angular-components/core/accordion';
import { HeadingType } from '@rapider/angular-components/core/heading';
import { RappiderRateComponent } from '@rapider/angular-components/rate';
import { FormsModule } from '@angular/forms';
import { RappiderSelectModule } from '@rapider/angular-components/select/select.module';
import { SelectComponentConfig } from '@rapider/angular-components/select';
import { RappiderNavigationBarComponent } from '@rapider/angular-components/navigation-bar';
import { ImageComponentConfig } from '@rapider/angular-components/image';
import { MenuActionBehavior, MenuMode } from '@rapider/angular-components/core/menu';
import { MenuComponentConfig } from '@rapider/angular-components/menu';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderRateComponent,
    RappiderSelectModule,
    // RappiderBadgeComponent,
    RappiderNavigationBarComponent,
  ],
  selector: 'app-page',
  template: `
    <div style="border: 1px solid black; padding: 30px; margin: 5px;">
      <!--
      <rappider-badge status="success">Success</rappider-badge>
      <rappider-badge status="error">Error</rappider-badge>

      <rappider-text text="welcome to the showboard" textMode="html" [content]="html"></rappider-text>
      <rappider-button text="Button Here3" type="primary"></rappider-button>
      <rappider-heading content="content" type="h1"></rappider-heading>
      <rappider-icon name="fa-brands fa-youtube"></rappider-icon>
      <rappider-icon name="step-forward" type="NG_ZORRO"></rappider-icon>
      <rappider-paragraph content="paragraph here"></rappider-paragraph>
      <rappider-html-viewer [html]="html"></rappider-html-viewer>
      <rappider-icon name="home" type="MATERIAL"></rappider-icon>
      <rappider-image source="https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg" width="100px" height="100px"></rappider-image>
      <rappider-avatar [icon]="icon" [size]="'default'"></rappider-avatar>
      <rappider-tag [text]="text" [icon]="icon" color="processing"></rappider-tag>
      <rappider-rate-display [rate]="3"></rappider-rate-display>
      <rappider-alert title="Tiel Bound He" description="lorem ipsum dolor sit amet" [closeable]="true"></rappider-alert>
      <rappider-rate [(ngModel)]="rate" (valueChange)="onChange($event)"></rappider-rate>
      <rappider-spin [spinning]="true">helo</rappider-spin>
      <rappider-select [options]="select.options" [ngModel]="'turkish-airlines'" optionMode="options"></rappider-select>
    -->
    </div>

    <div style="border: 1px solid black; padding: 30px; margin: 5px;">
      <rappider-rate
        [(ngModel)]="rate"
        (valueChange)="onChange($event)"
      ></rappider-rate>
    </div>

    <div style="border: 1px solid black; padding: 30px; margin: 5px;">
      <rappider-navigation-bar
        [isMenuVisible]="isMenuVisible"
        [brandText]="brandText"
        [brandImage]="brandImage"  
        [menu]="menu"  
      ></rappider-navigation-bar>
    </div>
  `,
})
export class Page1Component {
  html = `<div style="font-size:20px; color:blue">welcome to the showboard</div>`;
  icon: IconComponentConfig = {
    name: 'fa-brands fa-facebook',
    type: IconType.FontAwesome,
  };
brandImage: ImageComponentConfig = {
  source: 'https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg',
  alternateText: 'facebook',
  width: '100px',
};
  isMenuVisible = true;
  brandText = 'Rappider';
  text: TextComponentConfig = {
    text: 'Facebook',
  };
  panels: AccordionPanel[] = [
    {
      name: {
        content: 'heading name',
        type: HeadingType.H6,
      },
      content: {
        text: 'text here',
      },
      active: true,
      disabled: false,
    },
  ];

  menu: MenuComponentConfig = {
    config: {
    items: [
      {
        label: "Home",
        isExpanded: false,
        redirectUrl: "/",
        actionBehavior: MenuActionBehavior.Router,
        children: [
          {
            label: "Home",
            redirectUrl: "/",
            actionBehavior: MenuActionBehavior.Router,
          },
          {
            label: "Home",
            redirectUrl: "/",
            actionBehavior: MenuActionBehavior.Router,
          },
          {
            label: "Home",
            redirectUrl: "/",
            actionBehavior: MenuActionBehavior.Router,
          }
        ]
      },
      {
        label: "Home",
        isExpanded: false,
        redirectUrl: "/",
        actionBehavior: MenuActionBehavior.Router,
      },
      {
        label: "Contact",
        isExpanded: false
      },
      {
        label: "Home",
        isExpanded: false,
        redirectUrl: "/",
        actionBehavior: MenuActionBehavior.Router,
        "children": [
          {
            label: "Home",
            redirectUrl: "/",
            actionBehavior: MenuActionBehavior.Router,
          },
          {
            label: "Home",
            redirectUrl: "/",
            actionBehavior: MenuActionBehavior.Router,
          }
        ]
      },
      {
        label: "Home",
        isExpanded: false,
      },
      {
        label: "Home",
        isExpanded: false,
      }
    ],
    mode: MenuMode.Horizontal
  }
}


  rate = 4;

  select: SelectComponentConfig = {
    options: [
      { key: 'Turkish Airlines', value: 'turkish-airlines' },
      { key: 'Pegasus', value: 'pegasus' },
    ],
  };

  onChange(event) {
    console.log(event);
  }
}
