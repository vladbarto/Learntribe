import {Component, Input, OnInit} from '@angular/core';
import {LectureModel} from '../../../shared/components/model/LectureModel';
import {AuthService} from '../../../core/service/auth/auth.service';
import {LectureService} from '../../../core/service/lecture/lecture.service';
import {EnrollmentService} from '../../../core/service/enrollment/enrollment.service';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent implements OnInit {
  @Input() lecture!: LectureModel;
  today = new Date();
  enrolled: boolean = false;
  overlayOpen: boolean = false;  // for bubble menu
  showCalendarModal: boolean = false;
  showStatsModal: boolean = false;

  constructor(
    public authService: AuthService,
    private lectureService: LectureService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.alreadyEnrolled();
  }

  protected readonly AuthService = AuthService;

  public hasLectureEnded(): boolean {
    return new Date(this.lecture.endDate) <= this.today;
  }

  public enrollInLecture() {
    if (this.lecture._id != null) {
      this.enrollmentService.enrollStudent(this.lecture._id).subscribe({
        next: () => {
          console.log('Enrolled successfully!');
          if (this.lecture._id != null) {
            this.lectureService.getLectureById(this.lecture._id).subscribe({
              next: (updatedLecture) => {
                this.lecture = updatedLecture;
                this.alreadyEnrolled();
              },
              error: (err) => {
                console.error('Failed to reload lecture: ' + err.message);
              }
            });
          }
        },
        error: (err) => {
          console.error('Enrollment failed: ' + err.message);
        }
      });
    }
  }

  public alreadyEnrolled(): boolean {
    const storage = JSON.parse(sessionStorage.getItem('currentUser')!);
    let response = false;


    if (this.lecture._id != null) {
      this.enrollmentService.getAlreadyEnrolled(this.lecture._id, storage._id).subscribe({
        next: value => {
          this.enrolled = value;
        }
      });
    }

    return response;
  }

  toggleOverlay() {
    this.overlayOpen = !this.overlayOpen;
  }

  openCalendar() {
    this.showCalendarModal = true;
    this.overlayOpen = false;
  }

  openStats() {
    this.showStatsModal = true;
    this.overlayOpen = false;
  }

  closeCalendarModal() {
    this.showCalendarModal = false;
  }

  closeStatsModal() {
    this.showStatsModal = false;
  }

  showLectureDetails(lecture: LectureModel) {

  }
}
