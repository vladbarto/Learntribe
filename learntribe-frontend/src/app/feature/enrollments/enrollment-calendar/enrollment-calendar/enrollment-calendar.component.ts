import { Component, Input, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../core/service/enrollment/enrollment.service';
import { LectureModel } from '../../../../shared/components/model/LectureModel';

@Component({
  selector: 'app-enrollment-calendar',
  templateUrl: './enrollment-calendar.component.html',
  styleUrls: ['./enrollment-calendar.component.css']
})
export class EnrollmentCalendarComponent implements OnInit {
  @Input() lecture!: LectureModel;
  monthDays: string[] = [];
  currentMonth: Date = new Date();
  enrolledDates: Set<string> = new Set();

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    if (this.lecture?.startDate && this.lecture?.endDate) {
      this.loadMonthData();
    }
  }

  loadMonthData(): void {
    this.monthDays = this.generateMonthDays(this.currentMonth);

    this.enrollmentService.getEnrollmentsByLecture(this.lecture._id).subscribe(enrollments => {
      this.enrolledDates.clear();

      // Only if there are enrollments
      if (enrollments.length > 0) {
        const startDate = new Date(this.lecture.startDate);
        const endDate = new Date(this.lecture.endDate);
        this.addDatesInRange(startDate, endDate);
      }
    });
  }

  addDatesInRange(startDate: Date, endDate: Date): void {
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      this.enrolledDates.add(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  generateMonthDays(date: Date): string[] {
    const daysInMonth: string[] = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDate = firstDay.getDay(); // Starting day of the month (Sun = 0)
    const totalDays = lastDay.getDate(); // Total days in the month

    // Add empty slots for the days before the start of the month
    for (let i = 0; i < startDate; i++) {
      daysInMonth.push('');
    }

    // Add days for the current month
    for (let day = 1; day <= totalDays; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
      daysInMonth.push(currentDay.toISOString().split('T')[0]);
    }

    return daysInMonth;
  }

  getDayNumber(day: string): string {
    if (!day) return '';
    const date = new Date(day);
    return date.getDate().toString(); // Just the day number
  }

  isHighlighted(day: string): boolean {
    return this.enrolledDates.has(day);
  }

  prevMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.loadMonthData();
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.loadMonthData();
  }
}
