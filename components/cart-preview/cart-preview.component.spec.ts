import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderCartPreviewComponent } from './cart-preview.component';

describe('RappiderCartPreviewComponent', () => {
  let component: RappiderCartPreviewComponent;
  let fixture: ComponentFixture<RappiderCartPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RappiderCartPreviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderCartPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
