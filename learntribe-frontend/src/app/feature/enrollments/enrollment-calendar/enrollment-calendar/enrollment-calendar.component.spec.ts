import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentCalendarComponent } from './enrollment-calendar.component';

describe('EnrollmentCalendarComponent', () => {
  let component: EnrollmentCalendarComponent;
  let fixture: ComponentFixture<EnrollmentCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
