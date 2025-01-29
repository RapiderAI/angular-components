import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderColorPickerComponent } from './color-picker.component';

describe('RappiderColorPickerComponent', () => {
  let component: RappiderColorPickerComponent;
  let fixture: ComponentFixture<RappiderColorPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderColorPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
