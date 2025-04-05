import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureDetailPanelComponent } from './lecture-detail-panel.component';

describe('LectureDetailPanelComponent', () => {
  let component: LectureDetailPanelComponent;
  let fixture: ComponentFixture<LectureDetailPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LectureDetailPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
