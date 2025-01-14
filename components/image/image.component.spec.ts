import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderImageComponent } from './image.component';

describe('RappiderImageComponent', () => {
  let component: RappiderImageComponent;
  let fixture: ComponentFixture<RappiderImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
