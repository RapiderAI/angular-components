import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderDropdownMenuComponent } from './dropdown-menu.component';

describe('RappiderDropdownMenuComponent', () => {
  let component: RappiderDropdownMenuComponent;
  let fixture: ComponentFixture<RappiderDropdownMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderDropdownMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
