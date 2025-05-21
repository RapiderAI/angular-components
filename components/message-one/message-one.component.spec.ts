import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RappiderMessageOneComponent } from './message-one.component';

describe('RappiderMessageOneComponent', () => {
  let component: RappiderMessageOneComponent;
  let fixture: ComponentFixture<RappiderMessageOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderMessageOneComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderMessageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
