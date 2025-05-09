import { Component, Input } from '@angular/core';
import { ButtonComponentConfig, RappiderButtonComponent, RappiderButtonModule } from '@rapider/angular-components/button';
import { HeadingComponentConfig, RappiderHeadingComponent } from '@rapider/angular-components/heading';
import { CommonModule } from '@angular/common';
import { MessageOneItem } from '@rapider/angular-components/core/message-one';
import { RappiderAvatarComponent } from '@rapider/angular-components/avatar';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderParagraphComponent } from '@rapider/angular-components/paragraph';
import { RappiderLabelComponent } from '@rapider/angular-components/label';


@Component({
  selector: 'rappider-message-one',
  standalone: true,
  imports: [
    CommonModule,
    RappiderAvatarComponent,
    RappiderHeadingComponent,
    RappiderTextComponent,
    RappiderLabelComponent,
    RappiderParagraphComponent,
    RappiderButtonComponent
  ],
  templateUrl: './message-one.component.html',
  styleUrls: ['./message-one.component.scss']
})
export class RappiderMessageOneComponent {

  @Input() data: MessageOneItem[];
  @Input() heading: HeadingComponentConfig;
  @Input() button: ButtonComponentConfig;

}
