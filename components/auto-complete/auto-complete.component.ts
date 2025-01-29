import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutocompleteDataSource } from 'ng-zorro-antd/auto-complete';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig, computeBorderStyles } from '@rapider/angular-components/core/style';
import { TypographyConfig } from '@rapider/angular-components/core/typography';

@Component({
  selector: 'rappider-auto-complete',
  templateUrl: './auto-complete.component.html',
  imports: [
    CommonModule,
    NzAutocompleteModule,
    FormsModule,
    NzInputModule
  ],
  standalone: true,
  styleUrls: ['./auto-complete.component.scss'],
})
export class RappiderAutoCompleteComponent implements OnInit {
  /* backfill selected item the input when using keyboard */
  @Input() backfill: boolean;
  /* Data source for autocomplete  (Rappider Schema String[]) */
  @Input() dataSource: AutocompleteDataSource;
  /* Whether active first option by default */
  @Input() defaultActiveFirstOption: boolean;
  /* Class name of the dropdown root element */
  @Input() overlayClassName: string;
  /* Style of the dropdown root element */
  @Input() overlayStyle: object;
  /* bind ngModel of the trigger element */
  @Input() value: any;
  /* textbox placeholder */
  @Input() placeholder: string;
  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() typographySettings: TypographyConfig;

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  borderStyles: any = {};

  ngOnInit(): void {
    this.setBorderStyles();
  }

  onBlur() {
    this.blur.emit(this.value);
  }

  onTextboxValueChange(value: string) {
    this.valueChange.emit(value);
  }

  setBorderStyles(): any {
    this.borderStyles = computeBorderStyles({
      border: this.borderSettings?.border,
      borderRadius: this.borderSettings?.borderRadius
    });
  }
}
