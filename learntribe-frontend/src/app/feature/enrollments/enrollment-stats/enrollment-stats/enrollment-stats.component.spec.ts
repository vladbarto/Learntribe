import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentStatsComponent } from './enrollment-stats.component';

describe('EnrollmentStatsComponent', () => {
  let component: EnrollmentStatsComponent;
  let fixture: ComponentFixture<EnrollmentStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
