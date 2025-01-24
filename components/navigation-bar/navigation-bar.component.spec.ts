import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RappiderNavigationBarComponent } from './navigation-bar.component';

describe('RappiderNavigationBarComponent', () => {
  let component: RappiderNavigationBarComponent;
  let fixture: ComponentFixture<RappiderNavigationBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderNavigationBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
