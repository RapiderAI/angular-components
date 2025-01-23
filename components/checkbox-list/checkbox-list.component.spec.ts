import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RappiderCheckboxListComponent } from './checkbox-list.component';

describe('RappiderCheckboxListComponent', () => {
  let component: RappiderCheckboxListComponent;
  let fixture: ComponentFixture<RappiderCheckboxListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderCheckboxListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
