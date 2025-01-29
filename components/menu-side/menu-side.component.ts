import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuActionBehavior } from '@rapider/angular-components/core/menu-side';
import { MenuItem } from '@rapider/angular-components/core/menu-side';
import { RappiderIconComponent } from '@rapider/angular-components/icon';
import { RappiderTagComponent } from '@rapider/angular-components/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'rappider-menu-side',
  standalone: true,
  imports: [
    CommonModule,
    NzDrawerModule,
    RappiderTagComponent,
    RappiderIconComponent,
    NzMenuModule
  ],
  templateUrl: './menu-side.component.html',
  styleUrls: ['./menu-side.component.scss']
})
export class RappiderMenuSideComponent implements AfterViewInit {

  @Input() items: MenuItem[];
  @Input() isMobileView: boolean;
  @Input() mobileMenuVisibility: boolean;

  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() mobileMenuVisibilityChange = new EventEmitter<void>();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  menuClick(event: Event, menuItem: MenuItem) {
    event.stopPropagation();
    switch (menuItem.actionBehavior) {
      case MenuActionBehavior.Emit:
        this.menuItemClick.emit(menuItem);
        if (this.isMobileView && this.mobileMenuVisibility) {
          this.closeMobileMenu();
        }
        break;
      case MenuActionBehavior.Route:
        this.router.navigate([menuItem.redirectUrl], { queryParams: menuItem.queryParams });
        if (this.isMobileView && this.mobileMenuVisibility) {
          this.closeMobileMenu();
        }
        break;
      default:
        break;
    };
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  closeMobileMenu() {
    this.mobileMenuVisibilityChange.emit();
  }

  trackMenu(index, item) {
    return index;
  }
}
