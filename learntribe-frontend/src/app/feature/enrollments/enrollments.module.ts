import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EnrollmentCalendarComponent} from './enrollment-calendar/enrollment-calendar/enrollment-calendar.component';
import {EnrollmentStatsComponent} from './enrollment-stats/enrollment-stats/enrollment-stats.component';
import {CalendarModule} from 'angular-calendar';

@NgModule({
  declarations: [
    EnrollmentCalendarComponent,
    EnrollmentStatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
  ],
  exports: [
    EnrollmentCalendarComponent,
    EnrollmentStatsComponent
  ]
})
export class EnrollmentsModule { }
