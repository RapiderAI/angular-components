import { Component, OnInit, Output, Input, EventEmitter, forwardRef, OnChanges, HostBinding, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GrouppedOption, SelectMode, SelectSettings, SelectOptionMode } from '@rapider/angular-components/core/select';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { BorderConfig, BoxShadowConfig, ColorConfig, SizeConfig, SpacingConfig, InputSize } from '@rapider/angular-components/core/style';
import { RappiderButtonComponent, ButtonComponentConfig } from '@rapider/angular-components/button';
import { RappiderSpinComponent } from '@rapider/angular-components/spin';
import { RappiderIconComponent, IconComponentConfig } from '@rapider/angular-components/icon';
import { groupBy } from 'lodash';


@Component({
  selector: 'rappider-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzPopoverModule,
    RappiderButtonComponent,
    RappiderIconComponent,
    RappiderSpinComponent,
    TranslateModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderSelectComponent),
      multi: true
    }
  ]
})
export class RappiderSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

  /**
   * options has lower priorty than groupped options
   *
   * @type {SelectableOption[]}
   * @memberof RappiderSelectComponent
   */
  @Input() options?: SelectableOption[];
  /**
   * groupped options has higher priorty than options
   *
   * @type {GrouppedOption[]}
   * @memberof RappiderSelectComponent
   */
  @Input() grouppedOptions: GrouppedOption[];
  @Input() settings: SelectSettings;
  @Input() placeholder: string;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() invalidConfigText: string;
  @Input() disabled: boolean;
  @Input() loading = false;
  @Input() buttons?: ButtonComponentConfig[];
  @Input() dropdownMatchSelectWidth: boolean;
  @Input() dropdownClassName: string;
  @Input() borderSettings: BorderConfig;
  @Input() sizeSettings: SizeConfig;
  @Input() colorSettings: ColorConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;
  @Input() size: InputSize;
  @Input() customTemplate: TemplateRef<any>;
  @Input() optionMode: SelectOptionMode | undefined;
  @Input() initialValue: any;

  SelectOptionMode = SelectOptionMode;

  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<ButtonComponentConfig>();

  @HostBinding('style.--select-border') border;
  @HostBinding('style.--select-border-top') borderTop;
  @HostBinding('style.--select-border-right') borderRight;
  @HostBinding('style.--select-border-bottom') borderBottom;
  @HostBinding('style.--select-border-left') borderLeft;
  @HostBinding('style.--select-border-radius') borderRadius;
  @HostBinding('style.--select-border-top-left-radius') borderTopLeftRadius;
  @HostBinding('style.--select-border-top-right-radius') borderTopRightRadius;
  @HostBinding('style.--select-border-bottom-left-radus') borderBottomLeftRadius;
  @HostBinding('style.--select-border-bottom-right-radius') borderBottomRightRadius;
  @HostBinding('style.--select-border-color') borderColor;
  @HostBinding('style.--select-border-style') borderStyle;

  @HostBinding('style.--select-width') width;
  @HostBinding('style.--select-max-width') maxWidth;
  @HostBinding('style.--select-min-width') minWidth;
  @HostBinding('style.--select-height') height;
  @HostBinding('style.--select-max-height') maxHeight;
  @HostBinding('style.--select-min-height') minHeight;

  @HostBinding('style.--select-background-color') backgroundColor;
  @HostBinding('style.--select-color') color;

  @HostBinding('style.--select-padding') padding;
  @HostBinding('style.--select-padding-top') paddingTop;
  @HostBinding('style.--select-padding-right') paddingRight;
  @HostBinding('style.--select-padding-bottom') paddingBottom;
  @HostBinding('style.--select-padding-left') paddingLeft;

  @HostBinding('style.--select-margin') margin;
  @HostBinding('style.--select-margin-top') marginTop;
  @HostBinding('style.--select-margin-right') marginRight;
  @HostBinding('style.--select-margin-bottom') marginBottom;
  @HostBinding('style.--select-margin-left') marginLeft;

  @HostBinding('style.--select-box-shadow') boxShadow;

  SelectMode = SelectMode;
  DEFAULT_MODE = SelectMode.Single;
  _value: any;

  selectedOptionIcon: IconComponentConfig;
  displayedGrouppedOptions: any[] = [];

  tooltipTitle: string[];

  get value() {
    return this._value;
  }

  set value(value: any | any[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
    this.initDefaults();
    this.setGrouppedOptionsWithGroupBy();
    this.setValue();
  }

  ngOnChanges() {
    this.initDefaults();
    this.setValue();
  }

  setValue() {
    if (this.initialValue) {
      this._value = this.initialValue;
    }
  }

  initDefaults() {
    if (!this.optionMode) {
      if (this.options?.length) {
        this.optionMode = SelectOptionMode.Options;
      } else if (this.grouppedOptions?.length) {
        this.optionMode = SelectOptionMode.GrouppedOptions;
      } else {
        this.optionMode = SelectOptionMode.Options;
      }
    }
    if (this.dropdownMatchSelectWidth == null) {
      this.dropdownMatchSelectWidth = false;
    }
    if (this.settings?.searchable == null) {
      this.settings = {
        ...this.settings,
        searchable: true
      };
    }
    if (this.settings?.allowClear == null) {
      this.settings = {
        ...this.settings,
        allowClear: true
      };
    }
    this.setBorderConfig();
    this.setSizeConfig();
    this.setColorConfig();
    this.setSpacingConfig();
    this.boxShadow = this.boxShadowSettings?.boxShadow;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur() {
    if (this.value != null && this.optionMode === SelectOptionMode.Options) {
      if (this.settings.mode === SelectMode.Single) {
        this.selectedOptionIcon = this.options?.find(option => option.value === this.value)?.icon;
      }
    } else {
      this.selectedOptionIcon = null;
    }
    if (this.value?.length > this.settings?.maxTagCount) {
      const optionsLength = this.value.length - this.settings?.maxTagCount;
      this.tooltipTitle = this.value.slice(-optionsLength);
    }
    this.blur.emit(this.value);
  }

  getInvalidConfigText() {
    return this.invalidConfigText ?? 'Options are missing or not usable.';
  }

  onSearchTextChange(searchText: string) {
    this.searchTextChange.emit(searchText);
  }

  onButtonClick(button: ButtonComponentConfig) {
    this.buttonClick.emit(button);
  }

  setBorderConfig() {
    if (this.borderSettings) {
      this.border = this.borderSettings?.border;
      this.borderTop = this.borderSettings?.borderTop;
      this.borderRight = this.borderSettings?.borderRight;
      this.borderBottom = this.borderSettings?.borderBottom;
      this.borderLeft = this.borderSettings?.borderLeft;
      this.borderRadius = this.borderSettings?.borderRadius;
      this.borderTopLeftRadius = this.borderSettings?.borderTopLeftRadius;
      this.borderTopRightRadius = this.borderSettings?.borderTopRightRadius;
      this.borderBottomLeftRadius = this.borderSettings?.borderBottomLeftRadius;
      this.borderBottomRightRadius = this.borderSettings?.borderBottomRightRadius;
      this.borderColor = this.borderSettings?.borderColor;
      this.borderStyle = this.borderSettings?.borderStyle;
    } else {
      this.border = 'var(--border-size-x) solid var(--secondary-border-color)';
      this.borderRadius = 'var(--border-radius-2x)';
    }
  }

  setSizeConfig() {
    if (this.sizeSettings) {
      this.width = this.sizeSettings?.width;
      this.minWidth = this.sizeSettings?.minWidth;
      this.maxWidth = this.sizeSettings?.maxWidth;
      this.height = this.sizeSettings?.height;
      this.minHeight = this.sizeSettings?.minHeight;
      this.maxHeight = this.sizeSettings?.maxHeight;
    } else {
      // default ng-zorro value
      this.height = '2.6625rem';
    }
  }

  setColorConfig() {
    if (this.colorSettings) {
      this.color = this.colorSettings?.color;
      this.backgroundColor = this.colorSettings?.backgroundColor;
    } else {
      this.color = 'var(--disabled-text-color)';
      this.backgroundColor = 'var(--input-background-color)';
    }
  }

  setSpacingConfig() {
    if (this.paddingSettings || this.marginSettings) {
      this.margin = this.marginSettings?.all;
      this.marginTop = this.marginSettings?.top;
      this.marginRight = this.marginSettings?.right;
      this.marginBottom = this.marginSettings?.bottom;
      this.marginLeft = this.marginSettings?.left;
      this.padding = this.paddingSettings?.all;
      this.paddingTop = this.paddingSettings?.top;
      this.paddingRight = this.paddingSettings?.right;
      this.paddingBottom = this.paddingSettings?.bottom;
      this.paddingLeft = this.paddingSettings?.left;
    } else {
      // default ng-zorro value
      this.padding = '0 11px';
    }
  }

  setGrouppedOptionsWithGroupBy() {
    if (this.grouppedOptions) {
      const tempGrouppedOptions = groupBy(this.grouppedOptions, 'groupLabel');
      const groupOrder = Array.from(
        new Set(
          this.grouppedOptions
            .map(option => option.groupLabel)
            .filter((groupLabel): groupLabel is string => typeof groupLabel === 'string')
        )
      );

      this.displayedGrouppedOptions = groupOrder.map(groupLabel => ({
        groupLabel,
        items: tempGrouppedOptions[groupLabel] || []
      }));
    }
  }
}
