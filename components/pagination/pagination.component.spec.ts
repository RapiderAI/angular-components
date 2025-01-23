import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderPaginationComponent } from './pagination.component';

describe('RappiderPaginationComponent', () => {
  let component: RappiderPaginationComponent;
  let fixture: ComponentFixture<RappiderPaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
