import { Component, OnInit, Output, Input, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectableOption } from '@rapider/angular-components/core/common';
import { TagInputSettings } from '@rapider/angular-components/core/tag-input';
import { ButtonType } from '@rapider/angular-components/core/button';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { BorderConfig, BoxShadowConfig, ColorConfig, InputSize, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rappider-tag-input',
  standalone: true,
  imports: [RappiderButtonComponent, NzSelectModule, FormsModule, CommonModule],
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RappiderTagInputComponent),
      multi: true
    }
  ]
})
export class RappiderTagInputComponent implements OnInit, ControlValueAccessor {
  @Input() options: SelectableOption[];
  @Input() settings: TagInputSettings;
  @Input() placeholder: string;
  @Input() cssStyle: { [key: string]: any };
  @Input() cssClass: string;
  @Input() multipleSelection = true;
  @Input() sizeSettings: SizeConfig;
  @Input() size: InputSize;
  @Input() borderSettings: BorderConfig;
  @Input() boxShadowSettings: BoxShadowConfig;
  @Input() colorSettings: ColorConfig;
  @Input() paddingSettings: SpacingConfig;
  @Input() marginSettings: SpacingConfig;

  @Output() blur = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();

  // Dynamic style bindings using HostBinding
  @HostBinding('style.--tag-border') border;
  @HostBinding('style.--tag-border-top') borderTop;
  @HostBinding('style.--tag-border-right') borderRight;
  @HostBinding('style.--tag-border-bottom') borderBottom;
  @HostBinding('style.--tag-border-left') borderLeft;
  @HostBinding('style.--tag-border-radius') borderRadius;
  @HostBinding('style.--tag-border-top-left-radius') borderTopLeftRadius;
  @HostBinding('style.--tag-border-top-right-radius') borderTopRightRadius;
  @HostBinding('style.--tag-border-bottom-left-radus') borderBottomLeftRadius;
  @HostBinding('style.--tag-border-bottom-right-radius') borderBottomRightRadius;
  @HostBinding('style.--tag-border-color') borderColor;
  @HostBinding('style.--tag-border-style') borderStyle;

  @HostBinding('style.--tag-width') width;
  @HostBinding('style.--tag-max-width') maxWidth;
  @HostBinding('style.--tag-min-width') minWidth;
  @HostBinding('style.--tag-height') height;
  @HostBinding('style.--tag-max-height') maxHeight;
  @HostBinding('style.--tag-min-height') minHeight;

  @HostBinding('style.--tag-background-color') backgroundColor;
  @HostBinding('style.--tag-color') color;

  @HostBinding('style.--tag-padding') padding;
  @HostBinding('style.--tag-padding-top') paddingTop;
  @HostBinding('style.--tag-padding-right') paddingRight;
  @HostBinding('style.--tag-padding-bottom') paddingBottom;
  @HostBinding('style.--tag-padding-left') paddingLeft;

  @HostBinding('style.--tag-margin') margin;
  @HostBinding('style.--tag-margin-top') marginTop;
  @HostBinding('style.--tag-margin-right') marginRight;
  @HostBinding('style.--tag-margin-bottom') marginBottom;
  @HostBinding('style.--tag-margin-left') marginLeft;

  @HostBinding('style.--tag-box-shadow') boxShadow;

  clearButtonComponentConfig: ButtonComponentConfig = {
    type: ButtonType.Link,
    icon: {
      name: 'fa-solid fa-circle-xmark',
      color: 'var(--disabled-text-color)'
    }
  };
  tagCount: number;
  disable = false;
  _value: any;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
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

  onBlur(tags) {
    this.tagCount = tags?.length;

    if (!this.multipleSelection && this.tagCount < 2) {
      this.disable = true;
      this.blur.emit(this.value);
    } else {
      this.blur.emit(this.value);
    }
  }

  clearTags() {
    this.value = null;
    this.disable = false;
    this.tagCount = 0;
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

}
