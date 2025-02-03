import { Component, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AutoComponentConfig } from '@rapider/angular-components/auto-complete';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { ButtonColorType, ButtonSize, ButtonType } from '@rapider/angular-components/core/button';
import { IconComponentConfig, RappiderIconComponent, RappiderIconModule } from '@rapider/angular-components/icon';
import { IconType, NgZorroIconTheme } from '@rapider/angular-components/core/icon';

import {
  MaterialIcons,
  FontAwesomeIcons,
  FontAwesomeIconType,
  fontAwesomeIconTypeButtonsConfig,
  NgZorroIcons,
  ngZorroIconTypeButtonsConfig,
  ngZorroIconThemeOptionsConfig,
  fontAwesomeIconAnimationOptionsConfig
} from '@rapider/angular-components/core/icon-picker-two';
import { snakeCase } from 'lodash';
import { RadioGroupOptions } from '@rapider/angular-components/core/radio-group';
import { fontAwesomeIconStyleOptionsConfig } from '@rapider/angular-components/core/icon-picker-two/font-awesome-icon-style-option-config';
import { PaginationComponentConfig, RappiderPaginationModule } from '@rapider/angular-components/pagination';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RappiderCheckboxListComponent } from '@rapider/angular-components/checkbox-list';
import { RappiderRadioGroupComponent } from '@rapider/angular-components/radio-group';
import { RappiderSelectComponent } from '@rapider/angular-components/select';
import { RappiderSearchComponent } from '@rapider/angular-components/search';
import { RappiderTextboxComponent } from '@rapider/angular-components/textbox';
import { RappiderColorPickerComponent } from '@rapider/angular-components/color-picker';
import { RappiderDimensionSelectComponent } from '@rapider/angular-components/dimension-select';
import { RappiderPaginationComponent } from '@rapider/angular-components/pagination';

@Component({
  selector: 'rappider-icon-picker-two',
  standalone: true,
  imports: [
    CommonModule,
    RappiderSearchComponent,
    RappiderButtonComponent,
    MatIconModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
    RappiderCheckboxListComponent,
    FormsModule,
    RappiderTextboxComponent,
    RappiderColorPickerComponent,
    RappiderDimensionSelectComponent,
    RappiderRadioGroupComponent,
    RappiderIconComponent,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    TranslateModule,
    RappiderSelectComponent,
    RappiderPaginationComponent
  ],
  templateUrl: './icon-picker-two.component.html',
  styleUrls: ['./icon-picker-two.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderIconPickerTwoComponent),
      multi: true
    }
  ]
})
export class RappiderIconPickerTwoComponent implements ControlValueAccessor, OnInit {

  @Output() setSelectIcon = new EventEmitter<IconComponentConfig>();
  @Output() cancelSelectedIcon = new EventEmitter();

  searchBox: AutoComponentConfig = {
    placeholder: 'Search icon'
  };
  searchButton: ButtonComponentConfig = {
    type: ButtonType.Link,
    icon: {
      name: 'fa-solid fa-magnifying-glass'
    }
  };
  okButton: ButtonComponentConfig = {
    type: ButtonType.Primary,
    text: 'OK',
    size: ButtonSize.Small
  };
  cancelButton: ButtonComponentConfig = {
    type: ButtonType.Dashed,
    text: 'Cancel',
    size: ButtonSize.Small,
    colorType: ButtonColorType.Danger
  };
  iconTypeOptions: RadioGroupOptions[] = [
    {
      value: IconType.NgZorro,
      label: 'Ng-Zorro'
    },
    {
      value: IconType.FontAwesome,
      label: 'Font Awesome'
    },
    {
      value: IconType.Material,
      label: 'Material'
    }
  ];

  iconThemeOptions = ngZorroIconThemeOptionsConfig;
  iconStyleOptions = fontAwesomeIconStyleOptionsConfig;
  iconAnimationOptions = fontAwesomeIconAnimationOptionsConfig;
  IconType = IconType;
  customIconForm: FormGroup;
  importIconForm: FormGroup;
  activeTab = IconType.FontAwesome;
  selectedIcon: string;
  searchValue: string;
  searchResults: string[];
  selectedFontAwesomeIconTypes: FontAwesomeIconType[] = [];
  FontAwesomeIconType = FontAwesomeIconType;

  selectedNgZorroIconThemeOptions: NgZorroIconTheme[] = [];
  selectedNgZorroIconTheme: NgZorroIconTheme;
  NgZorroIconTheme = NgZorroIconTheme;

  materialIcons = MaterialIcons;
  fontAwesomeIcons = FontAwesomeIcons;
  ngZorroIcons = NgZorroIcons;
  isCollapsed = false;
  fontAwesomeIconTypeButtonsConfig = fontAwesomeIconTypeButtonsConfig;
  ngZorroIconTypeButtonsConfig = ngZorroIconTypeButtonsConfig;

  _value: IconComponentConfig;
  paginationConfig: PaginationComponentConfig = {
    pageIndex: 1,
    total: 3,
    pageSize: 10,
    showPagination: true
  };

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get value() {
    return this._value;
  }

  set value(value: IconComponentConfig) {
    this.initValue(value);
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    this.buildCustomIconForm();
    this.buildImportIconForm();
  }

  writeValue(value: IconComponentConfig): void {
    if (value) {
      this.selectedIcon = value.name;
      this.activeTab = value.type;
    } else {
      this.initValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectIcon(icon, ngZorroTheme?: NgZorroIconTheme) {
    this.selectedIcon = icon;
    this.selectedNgZorroIconTheme = ngZorroTheme;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSearchTextChange(searchText: string) {
    this.searchValue = searchText;
  }

  activeTabChange(tabName: IconType) {
    this.activeTab = tabName;
    this.selectedIcon = null;
  }

  onOkButtonClick() {
    const iconName = this.selectedIcon;
    const iconType = snakeCase(this.activeTab).toUpperCase() as IconType;

    this.value = {
      name: iconName,
      type: iconType,
      theme: this.selectedNgZorroIconTheme
    };
    this.setSelectIcon.emit(this.value);
  }

  onCancelButtonClick() {
    this.selectedIcon = null;
    this.value = null;
    this.cancelSelectedIcon.emit();
  }

  initValue(value: IconComponentConfig) {
    if (!value) {
      this._value = {
        name: null
      };
    } else {
      this._value = value;
    }
  }

  buildCustomIconForm() {
    const formGroup = {
      name: '',
      color: '',
      size: '',
      type: '',
      theme: '',
      secondColor: '',
      style: '',
      animation: ''
    };
    this.customIconForm = this.formBuilder.group(formGroup);
  }

  buildImportIconForm() {
    const formGroup = {
      name: '',
      size: '',
      type: IconType.ImportIcon
    };
    this.importIconForm = this.formBuilder.group(formGroup);
  }

  onCustomIconSubmit() {
    this.value = {
      name: this.customIconForm.value.style + ' ' + this.customIconForm.value.name + ' ' + this.customIconForm.value.animation,
      color: this.customIconForm.value.color,
      size: this.customIconForm.value.size,
      type: this.customIconForm.value.type,
      theme: this.customIconForm.value.theme,
      secondColor: this.customIconForm.value.secondColor
    };
    this.setSelectIcon.emit(this.value);
  }

  onImportIconSubmit() {
    this.value = this.importIconForm.value;
    this.setSelectIcon.emit(this.value);
  }

  /* this function avoids re-rendering the list unnecessarily */
  trackItems(index, item) {
    return item.id;
  }

  iconTypeOptionsChange(value) {
    if (value === IconType.FontAwesome) {
      this.customIconForm.patchValue({ theme: '' });
    } else if (value === IconType.NgZorro) {
      this.customIconForm.patchValue({ style: '' });
    } else {
      this.customIconForm.patchValue({ theme: '' });
      this.customIconForm.patchValue({ style: '' });
    }
  }

  onPageIndexChange(pageIndex: number) {
    this.paginationConfig.pageIndex = pageIndex;
  }

  getDisplayedData() {
    if (this.activeTab === IconType.FontAwesome) {
      return this.fontAwesomeIcons;
    } else if (this.activeTab === IconType.NgZorro) {
      return this.ngZorroIcons;
    } else if (this.activeTab === IconType.Material) {
      return this.materialIcons;
    }
  }

  getDataWithPagination() {
    if (this.searchValue !== '' && this.searchValue) {
      return {
        values: this.getDisplayedData()?.filter(icon => icon.toLowerCase().includes(this.searchValue.toLowerCase())).slice((this.paginationConfig.pageIndex - 1) * this.paginationConfig.pageSize, this.paginationConfig.pageIndex * this.paginationConfig.pageSize),
        total: this.getDisplayedData()?.filter(icon => icon.toLowerCase().includes(this.searchValue.toLowerCase())).length
      };
    } else {
      return {
        values: this.getDisplayedData()?.slice((this.paginationConfig.pageIndex - 1) * this.paginationConfig.pageSize, this.paginationConfig.pageIndex * this.paginationConfig.pageSize),
        total: this.getDisplayedData()?.length
      };
    }
  }
}
