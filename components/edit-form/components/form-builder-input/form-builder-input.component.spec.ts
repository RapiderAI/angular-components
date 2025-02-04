import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderInputComponent } from './form-builder-input.component';

describe('FormBuilderInputComponent', () => {
  let component: FormBuilderInputComponent;
  let fixture: ComponentFixture<FormBuilderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuilderInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
