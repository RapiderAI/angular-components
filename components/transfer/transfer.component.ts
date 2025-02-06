import { Component, EventEmitter, forwardRef, Input, Output, SimpleChanges } from '@angular/core';
import { TransferChangeModeConfig, TransferDirection, TransferItemConfig, TransferMoveModeConfig, TransferSearchChangeModeConfig } from '@rapider/angular-components/core/transfer';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTransferComponent } from 'ng-zorro-antd/transfer';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rappider-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NzTransferComponent,
    TranslateModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderTransferComponent),
      multi: true
    }
  ]
})
export class RappiderTransferComponent implements ControlValueAccessor {

  /* Used for setting the data source. Except for the elements whose keys are direction: 'right' prop, or using nzTargetKeys prop. */
  @Input() list: TransferItemConfig[];
  /* Used for setting the data source. Except the elements whose keys are direction: 'right' prop. */
  @Input() direction: TransferDirection;
  /* Whether the transfer is disabled */
  @Input() disabled: boolean;
  /* A set of titles that are sorted from left to right. */
  @Input() titles: string[];
  /* A set of keys of selected items. */
  @Input() selectedKeys: string[];
  /* A set of keys of elements that are listed on the right column. */
  @Input() key: TransferItemConfig[];
  /* Text to display when a column is empty. */
  @Input() notFoundText: string;
  /* The hint text of the search box.	*/
  @Input() placeholder: string;
  /* Whether a search box is shown on each column.	 */
  @Input() isSearchable: boolean;
  /* Whether to display the select all box */
  @Input() isSelectAllButtonVisible: boolean;
  /* A function to determine what items should be moved (by default all checked items are moved). please refer to the case. */
  @Input() canMove: TransferMoveModeConfig;


  @Output() itemSelected = new EventEmitter<TransferSearchChangeModeConfig>();
  /* A callback function which is executed when selected items are changed. */
  @Output() change = new EventEmitter<TransferChangeModeConfig>();
  /* A callback function that is executed when the transfer between columns is complete. */

  _value: TransferItemConfig;
  TransferItemConfig: TransferItemConfig;
  TransferMoveModeConfig: TransferMoveModeConfig;

  get value() {
    return this._value;
  }

  set value(value: TransferItemConfig) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.itemSelected.emit({ direction: this.direction, value: value.key });
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: any) {
    this.change.emit(value);
  }

  onSelectChange(ret: any) {
    this.itemSelected.emit(ret);
  }

  writeValue(val: TransferItemConfig) {
    this._value = val;
  }

  ngOnInit(): void {
    this.writeValue(this.value);
    this.initDefaults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initDefaults();
  }

  initDefaults() {
    if (this.TransferItemConfig?.checked == true) {
      this.TransferMoveModeConfig.direction = TransferDirection.Right;
    }
    if (this.isSelectAllButtonVisible == true) {
      this.TransferItemConfig = {
        ...this.TransferItemConfig,
        checked: false
      }
    }
  }

}
