import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderIconPickerTwoComponent } from './icon-picker-two.component';

describe('IconPickerTwoComponent', () => {
  let component: RappiderIconPickerTwoComponent;
  let fixture: ComponentFixture<RappiderIconPickerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RappiderIconPickerTwoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderIconPickerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
