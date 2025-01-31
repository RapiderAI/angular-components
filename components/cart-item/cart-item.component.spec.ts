import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RappiderCartItemComponent } from './cart-item.component';

describe('RappiderCartItemComponent', () => {
  let component: RappiderCartItemComponent;
  let fixture: ComponentFixture<RappiderCartItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderCartItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
