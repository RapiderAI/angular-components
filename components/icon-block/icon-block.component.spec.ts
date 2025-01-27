import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderIconBlockComponent } from './icon-block.component';

describe('RappiderIconBlockComponent', () => {
  let component: RappiderIconBlockComponent;
  let fixture: ComponentFixture<RappiderIconBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderIconBlockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderIconBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
