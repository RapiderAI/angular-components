import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderDrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: RappiderDrawerComponent;
  let fixture: ComponentFixture<RappiderDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RappiderDrawerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
