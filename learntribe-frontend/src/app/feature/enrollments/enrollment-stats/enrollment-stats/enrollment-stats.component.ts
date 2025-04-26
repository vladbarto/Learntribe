import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {EnrollmentService} from '../../../../core/service/enrollment/enrollment.service';
import { LectureModel } from '../../../../shared/components/model/LectureModel';

@Component({
  selector: 'app-enrollment-stats',
  templateUrl: './enrollment-stats.component.html',
  styleUrls: ['./enrollment-stats.component.css']
})
export class EnrollmentStatsComponent implements OnChanges {
  @ViewChild('enrollmentChart') enrollmentChart!: ElementRef<HTMLCanvasElement>;

  enrollments: any[] = [];
  @Input() lecture!: LectureModel;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lecture'] && this.lecture._id) {
      console.log('Lecture ID received:', this.lecture._id); // <<< CHECK: will print lectureId
      this.loadEnrollments();
    }
    else {
      console.log("ceva nu ii bine aici");
    }
  }

  loadEnrollments(): void {
    console.log('Sending request for enrollments...');
    this.enrollmentService.getEnrollmentsByLecture(this.lecture._id).subscribe({
      next: (data) => {
        console.log('Fetched enrollments:', data); // <<< CHECK: prints response array
        this.enrollments = data.map((e: any) => ({
          enrollmentDate: new Date(e.enrollmentDate)
        }));
        this.drawChart();
      },
      error: (err) => console.error('Failed to load enrollments for stats:', err.message)
    });
  }

  private drawChart(): void {
    if (!this.enrollmentChart) return;
    const ctx = this.enrollmentChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // Prepare data
    const monthCounts = new Array(12).fill(0);
    this.enrollments.forEach(e => {
      const date = new Date(e.enrollmentDate);
      monthCounts[date.getMonth()]++;
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Clear previous
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Bar chart settings
    const barWidth = 30;
    const gap = 20;
    const chartHeight = 300;
    const maxCount = this.lecture.totalPlaces || 1;

    months.forEach((month, index) => {
      const x = index * (barWidth + gap) + 50;
      const barHeight = (monthCounts[index] / maxCount) * chartHeight;
      const y = chartHeight - barHeight + 50;

      // Draw bar
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Month label
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(
        monthCounts[index].toString(),
        x + barWidth / 2,
        y - 5);
    });

    // Axes
    ctx.beginPath();
    ctx.moveTo(40, 50);
    ctx.lineTo(40, chartHeight + 50);
    ctx.lineTo(ctx.canvas.width - 20, chartHeight + 50);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    const steps = 5; // how many ticks
    for (let i = 0; i <= steps; i++) {
      const value = Math.round((maxCount / steps) * i);
      const y = chartHeight + 50 - (chartHeight / steps) * i;
      ctx.fillText(value.toString(), 10, y + 4);
    }

  }
}
