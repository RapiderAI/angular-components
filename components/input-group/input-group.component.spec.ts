import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RappiderInputGroupComponent } from './input-group.component';

describe('RappiderInputGroupComponent', () => {
  let component: RappiderInputGroupComponent;
  let fixture: ComponentFixture<RappiderInputGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderInputGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
