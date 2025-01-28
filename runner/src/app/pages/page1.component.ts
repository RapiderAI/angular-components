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
import { RappiderRadioComponent } from '@rapider/angular-components/radio/radio.component';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { RappiderProgressComponent } from "@rapider/angular-components/progress";
import { ColorConfig } from '@rapider/angular-components/core/style';
import { SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderCheckboxListComponent } from '@rapider/angular-components/checkbox-list';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderPaginationComponent } from '@rapider/angular-components/pagination';
import { RappiderBlockquoteComponent } from '@rapider/angular-components/blockquote';
import { RappiderCommentComponent } from '@rapider/angular-components/comment';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderRateComponent,
    RappiderSelectModule,
    RappiderNavigationBarComponent,
  ],
  selector: 'app-page',
  template: `
    <div style="border: 1px solid black; padding: 30px; margin: 5px;">
    RappiderSelectComponent,
    RappiderSpinComponent,
    RappiderCheckboxListComponent,
    RappiderTextboxComponent,
    RappiderPaginationComponent,
    RappiderBlockquoteComponent,
    RappiderProgressComponent,
    RappiderCommentComponent,
  ],
  selector: 'app-page',
  template: `

  <div style="border: 1px solid black; padding: 30px; margin: 5px;">

      <rappider-accordion [panels]="panels"></rappider-accordion>
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
      <rappider-textbox [placeholder]="placeholder"></rappider-textbox>
      <rappider-progress [percent]="90" [showInfo]="true" [status]="'normal'" [type]="'dashboard'" [successPercent]="50" [width]="150" [strokeWidth]="10" [isSuccessPercentVisible]="true" [paddingSettings]="paddingSettings" [marginSettings]="marginSettings"></rappider-progress>
      <rappider-checkbox-list [options]="options"></rappider-checkbox-list>
      <rappider-blockquote [quote]="blockquote.quote" [footer]="blockquote.footer"></rappider-blockquote>
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
  <div style="border: 1px solid black; padding: 30px; margin: 5px;">
    <rappider-comment [comments]="comment.comments"></rappider-comment>
  </div>
  `,
})
export class Page1Component {

  comment = {
    comments: [
      {
        author: 'Can',
        avatar: 'user',
        createdDate: new Date(),
        content: 'Content here',
        likeCount: 40,
        dislikeCount: 12,
        children: [
          {
            author: 'Can',
            avatar: 'user',
            createdDate: new Date(),
            content: 'Content here',
            likeCount: 40,
            dislikeCount: 12,
            replyText: 'reply here',
            rate: 4,
            isLiked: true,
            isDisliked: true,
          }
        ],
        replyText: 'reply here',
        rate: 4,
        isLiked: true,
        isDisliked: true,
      }
    ]
  };

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
=======
    type: IconType.FontAwesome
  };

  paddingSettings: SpacingConfig = {
    all: '10px'
  };

  marginSettings: SpacingConfig = {
    all: '10px'
  };

  options2: SelectableOption[] = [
    { key: 'Alice', value: 'alice' },
    { key: 'Totoro', value: 'totoro' }
  ];

  placeholder = "Enter your name";

  style = '';
  type = 'horizontal';
  textPlacement = 'center';
  dividerWidth = '2px';
  dividerColor = 'red';

  text: TextComponentConfig = {
    text: 'Facebook'
  };

  blockquote = {
    quote: <TextComponentConfig>{
      text: 'Lorem ipsum dolot sit amet.'
    },
    footer: {
      text: 'John Doe'
    }
  };

  options = [
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
  ];

  panels: AccordionPanel[] = [
    {
      name: {
        content: "heading name",
        type: HeadingType.H6
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
