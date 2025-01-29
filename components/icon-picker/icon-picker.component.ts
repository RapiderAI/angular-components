import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconPickerValue } from '@rapider/angular-components/core/icon-picker';
import { IconType } from '@rapider/angular-components/core/icon';
import { MenuActionBehavior } from '@rapider/angular-components/core/menu';
import { MenuConfig } from '@rapider/angular-components/core/menu';
import { MenuMode } from '@rapider/angular-components/core/menu';
import { Menu } from '@rapider/angular-components/core/menu';
import { ICON_PICKER_CONFIG } from '@rapider/angular-components/core/icon-picker';
import { FONT_AWESOME_ICONS } from '@rapider/angular-components/core/icon-picker';
import { NG_ZORRO_ICONS } from '@rapider/angular-components/core/icon-picker';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RappiderModalComponent } from '@rapider/angular-components/modal';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderMenuComponent } from '@rapider/angular-components/menu';

@Component({
  selector: 'rappider-icon-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NzCardModule, NzButtonModule, RappiderModalComponent, RappiderIconComponent, RappiderMenuComponent],
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderIconPickerComponent),
      multi: true
    }
  ]
})
export class RappiderIconPickerComponent implements OnInit, ControlValueAccessor {

  @Output() blur = new EventEmitter<IconPickerValue>();
  @Output() valueChange = new EventEmitter<IconPickerValue>();

  _value: IconPickerValue;
  ICON_PICKER_CONFIG = ICON_PICKER_CONFIG;
  menuConfig: MenuConfig;
  fontAwesomeIcons = FONT_AWESOME_ICONS;
  ngZorroIcons = NG_ZORRO_ICONS;
  selectedLibrary = IconType.FontAwesome;
  selectedIndex: number;
  selectedIcon: IconPickerValue;
  buttonText: string;
  selectedSection: any;
  isIconPickerModalVisible = false;

  get value() {
    return this._value;
  }

  set value(value: IconPickerValue) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }


  ngOnInit(): void {
    this.setMenuConfig();
    this.changeSection(this.selectedLibrary);
    this.changeButtonText();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: IconPickerValue): void {
    if (value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  showIconPickerModal() {
    this.isIconPickerModalVisible = true;
  }

  closeIconPickerModal() {
    this.isIconPickerModalVisible = false;
  }

  /**
   * assigns clicked icons values on icon picker to selectedIcon
   * assign clicked icons index to selectedIndex
   *
   * @param {IconPickerValue} value
   * @param {number} index
   * @memberof RappiderIconPickerComponent
   */
  onIconSelect(value: IconPickerValue, index: number) {
    this.selectedIcon = value;
    this.selectedIndex = index;
  }

  /**
   * sets menu config according to present icon libraries
   *
   * @memberof RappiderIconPickerComponent
   */
  setMenuConfig() {
    const menuItemsConfig = Object.values(IconType).map(value =>
    // TODO: fix the code below
    // if (value === IconType.NgZorro) { }
    ({
      label: value,
      data: value,
      actionBehavior: MenuActionBehavior.Emit
    })
    );
    this.menuConfig = {
      mode: MenuMode.Vertical,
      items: menuItemsConfig
    };
  }

  onLibrarySelect(menuItem: Menu) {
    this.changeSection(<IconType>menuItem.data);
  }

  changeSection(selectedLibrary: IconType) {
    this.selectedSection = this.ICON_PICKER_CONFIG.sections.find(item => item.iconType === selectedLibrary);
    this.selectedIndex = null;
  }

  /**
   * emits selected icons value when clicked ok on icon picker modal
   *
   * @memberof RappiderIconPickerComponent
   */
  onClickOk() {
    this.value = {
      ...this.selectedIcon,
      type: this.selectedSection.iconType
    };
    this.blur.emit(this.value);
    this.closeIconPickerModal();
    this.changeButtonText();
  }

  /**
   * changes wrappers button text
   *
   * @memberof RappiderIconPickerComponent
   */
  changeButtonText() {
    this.buttonText = this.value ? 'Selected icon' : 'Select icon';
  }

  getCardClass(index: number) {
    return index === this.selectedIndex ? 'selected-card' : 'card';
  }
}
