import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderTextComponent, TextComponentConfig } from '@rapider/angular-components/text';

@Component({
  selector: 'rappider-blockquote',
  standalone: true,
  imports: [
    CommonModule,
    RappiderTextComponent,
  ],
  templateUrl: './blockquote.component.html',
  styleUrls: ['./blockquote.component.scss']
})
export class RappiderBlockquoteComponent {

  // content of blockquote
  @Input() quote: TextComponentConfig;
  // footer of blockquote
  @Input() footer: TextComponentConfig;
}
