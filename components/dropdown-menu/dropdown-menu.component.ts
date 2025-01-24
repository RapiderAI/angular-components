/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownMenuItem } from '../../utils/dropdown-menu/dropdown-menu-item.interface';
import { DropdownMenuLabelMode } from '../../utils/dropdown-menu/dropdown-menu-label-mode.enum';
import { DropdownMenuPlacement } from '../../utils/dropdown-menu/dropdown-menu-placement.enum';
import { DropdownMenuTriggerType } from '../../utils/dropdown-menu/dropdown-menu-trigger-type.enum';
import { IconComponentConfig } from '../../utils/icon/icon-component-config.interface';
import { IconType } from '../../utils/icon/icon-type.enum';
import { MenuActionBehavior } from '../../utils/menu/menu-action-behavior.enum';
import { SelectMode } from '../../utils/select/select-mode.enum';
import { DropdownType } from '../../utils/dropdown-menu';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RappiderIconComponent } from '../icon/icon.component';

@Component({
  selector: 'rappider-dropdown-menu',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NzDropDownModule,
    NzPopconfirmModule,
    NzButtonModule,
    RappiderIconComponent
  ],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => RappiderDropdownMenuComponent),
      multi: true
    }
  ]
})
export class RappiderDropdownMenuComponent implements OnInit, OnChanges, ControlValueAccessor {
  /* dropdown menu items */
  @Input() items: DropdownMenuItem[];
  /* dropdown placement */
  @Input() placement: DropdownMenuPlacement;
  /* dropdown button label */
  @Input() label: string;
  /* dropdown button icon */
  @Input() icon: IconComponentConfig;
  /* dropdown item trigger type */
  @Input() triggerType: DropdownMenuTriggerType;
  @Input() labelMode: DropdownMenuLabelMode;
  @Input() dropdownType = DropdownType.Default;
  @Input() borderless: boolean;

  @Output() menuItemClick = new EventEmitter<DropdownMenuItem>();
  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<any>();

  DropdownType = DropdownType;

  constructor(
    private router: Router
  ) { }

  DropdownMenuLabelMode = DropdownMenuLabelMode;
  DEFAULT_MODE = SelectMode.Single;
  _value: any;

  get value() {
    return this._value;
  }

  set value(value: any | any[]) {
    /* if value is null, assign value for show dropdown button */
    if (value == null && this.items?.length) {
      this._value = this.items[0].key;
    }
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }


  ngOnInit(): void {
    this.initDefaults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initDefaults();
  }


  initDefaults() {
    if (!this.triggerType) {
      this.triggerType = DropdownMenuTriggerType.Click;
    }
    if (!this.placement) {
      this.placement = DropdownMenuPlacement.BottomCenter;
    }
    if (!this.icon) {
      this.icon = {
        name: 'fas fa-caret-down',
        type: IconType.FontAwesome
      };
    }
    if (this.labelMode == null) {
      this.labelMode = DropdownMenuLabelMode.StaticLabel;
    }
    /* TODO: write value doesnt work in content-editor, fix it. */
    if (this.value == null && this.items?.length) {
      this.value = this.items[0].key;
    }
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
    this.blur.emit(this.value);
  }

  onMenuItemClick(event: Event, menu: DropdownMenuItem) {
    event?.stopPropagation();
    switch (menu.actionBehavior) {
      case MenuActionBehavior.Router:
        if (menu.redirectUrl) {
          this.router.navigateByUrl(menu.redirectUrl);
        }
        break;
      case MenuActionBehavior.Emit:
        this.menuItemClick.emit(menu);
        break;
      case MenuActionBehavior.NoAction:
        break;
      default:
        this.menuItemClick.emit(menu);
        break;
    }
    this.value = menu.key;
  }

  findSelectedItem() {
    return this.items?.find(item => item.key === this.value);
  }

}
