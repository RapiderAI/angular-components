import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderDynamicArrayFormComponent } from './dynamic-array-form.component';

describe('DynamicArrayFormComponent', () => {
  let component: RappiderDynamicArrayFormComponent;
  let fixture: ComponentFixture<RappiderDynamicArrayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RappiderDynamicArrayFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RappiderDynamicArrayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
