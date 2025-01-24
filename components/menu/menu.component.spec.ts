import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderMenuComponent } from './menu.component';

describe('RappiderMenuComponent', () => {
  let component: RappiderMenuComponent;
  let fixture: ComponentFixture<RappiderMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
