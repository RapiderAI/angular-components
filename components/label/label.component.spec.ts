import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderLabelComponent } from './label.component';

describe('RappiderLabelComponent', () => {
  let component: RappiderLabelComponent;
  let fixture: ComponentFixture<RappiderLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderLabelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
