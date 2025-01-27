import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderTextboxComponent } from './textbox.component';

describe('RappiderTextboxComponent', () => {
  let component: RappiderTextboxComponent;
  let fixture: ComponentFixture<RappiderTextboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderTextboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
