import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappiderRichTextEditorComponent } from './rich-text-editor.component';

describe('RappiderRichTextEditorComponent', () => {
  let component: RappiderRichTextEditorComponent;
  let fixture: ComponentFixture<RappiderRichTextEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RappiderRichTextEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappiderRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
