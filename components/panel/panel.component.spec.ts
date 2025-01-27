import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderPanelComponent } from './panel.component';

describe('RappiderPanelComponent', () => {
  let component: RappiderPanelComponent;
  let fixture: ComponentFixture<RappiderPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
