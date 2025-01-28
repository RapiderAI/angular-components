import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';
import { IconType } from '@rapider/angular-components/core/icon';
import { RappiderParagraphComponent } from '@rapider/angular-components/paragraph';
import { RappiderHtmlViewerComponent } from '@rapider/angular-components/html-viewer';
import { RappiderImageComponent } from '@rapider/angular-components/image';
import { RappiderAvatarComponent } from '@rapider/angular-components/avatar';
import { RappiderTagComponent } from '@rapider/angular-components/tag';
import { RappiderRateDisplayComponent } from '@rapider/angular-components/rate-display';
import { RappiderAlertComponent } from '@rapider/angular-components/alert';
import { RappiderAccordionComponent } from '@rapider/angular-components/accordion';
import { AccordionPanel } from '@rapider/angular-components/core/accordion';
import { HeadingType } from '@rapider/angular-components/core/heading';
import { RappiderRateComponent } from '@rapider/angular-components/rate';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderSpinComponent } from '@rapider/angular-components/spin';
import { SelectComponentConfig } from '@rapider/angular-components/select';
import { RappiderRadioComponent } from '@rapider/angular-components/radio/radio.component';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { RappiderProgressComponent } from "@rapider/angular-components/progress";
import { ColorConfig } from '@rapider/angular-components/core/style';
import { SpacingConfig } from '@rapider/angular-components/core/style';
import { RappiderCheckboxListComponent } from '@rapider/angular-components/checkbox-list';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderPaginationComponent } from '@rapider/angular-components/pagination';
import { RappiderBlockquoteComponent } from '@rapider/angular-components/blockquote';
import { RappiderInputLabelComponent } from '@rapider/angular-components/input-label/input-label.component';
import { RappiderCommentComponent } from '@rapider/angular-components/comment';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RappiderTextComponent,
    RappiderButtonComponent,
    RappiderHeadingComponent,
    RappiderIconComponent,
    RappiderParagraphComponent,
    RappiderHtmlViewerComponent,
    RappiderImageComponent,
    RappiderAvatarComponent,
    RappiderTagComponent,
    RappiderRateDisplayComponent,
    RappiderAlertComponent,
    RappiderAccordionComponent,
    RappiderRateComponent,
    RappiderSelectComponent,
    RappiderSpinComponent,
    RappiderCheckboxListComponent,
    RappiderTextboxComponent,
    RappiderPaginationComponent,
    RappiderBlockquoteComponent,
    // RappiderBadgeComponent,
    RappiderProgressComponent,
    RappiderInputLabelComponent,
    RappiderCommentComponent,
  ],
  selector: 'app-page',
  template: `

  <div style="border: 1px solid black; padding: 30px; margin: 5px;">

    <!--
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
  <rappider-input-label [title]="'i am input label'" [description]="'i am description'" [icon]="{name: 'fa-solid fa-user-group',type: 'FONT_AWESOME'}"></rappider-input-label>
    -->

  </div>

  <div style="border: 1px solid black; padding: 30px; margin: 5px;">
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
      key: {
        text: "Alice"
      },
      value: "alice",
      checkboxType: "default",
      tooltip: "tooltip",
      icon: {
        name: "fa-solid fa-wand-magic-sparkles"
      },
      additionalIcon: {
        name: "fa-solid fa-wand-magic-sparkles"
      },
    },
    {
      key: {
        text: "Jane"
      },
      value: "jane",
      checkboxType: "default",
      tooltip: "tooltip",
      icon: {
        name: "fa-solid fa-wand-magic-sparkles"
      },
      additionalIcon: {
        name: "fa-solid fa-wand-magic-sparkles"
      },
    },
  ];

  panels: AccordionPanel[] = [
    {
      name: {
        content: "heading name",
        type: HeadingType.H6
      },
      content: {
        text: "text here"
      },
      active: true,
      disabled: false
    }
  ];

  rate = 4;
  pageIndex = 3;
  total = 100;
  size = "default";
  pageSize = 10;
  isSimple = true;
  select: SelectComponentConfig = {
    options: [
      { key: 'Turkish Airlines', value: 'turkish-airlines' },
      { key: 'Pegasus', value: 'pegasus' },
    ]
  };

  onChange(event) {
    console.log(event);
  }
}
