import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderDividerComponent } from './divider.component';

describe('RappiderDividerComponent', () => {
  let component: RappiderDividerComponent;
  let fixture: ComponentFixture<RappiderDividerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderDividerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
