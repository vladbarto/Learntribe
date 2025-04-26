import {Component, Input, OnInit} from '@angular/core';
import {LectureModel} from '../../../shared/components/model/LectureModel';
import {AuthService} from '../../../core/service/auth/auth.service';
import {LectureService} from '../../../core/service/lecture/lecture.service';
import {EnrollmentService} from '../../../core/service/enrollment/enrollment.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrl: './lecture-card.component.css'
})
export class LectureCardComponent implements OnInit{
  @Input() lecture!: LectureModel;
  today = new Date();
  enrolled: boolean = false;

  constructor(
    public authService: AuthService,
    private lectureService: LectureService,
    private enrollmentService: EnrollmentService
  ) {
  }

  ngOnInit() {
    this.alreadyEnrolled();
  }

  protected readonly AuthService = AuthService;

  public hasLectureEnded(): boolean {
    return new Date(this.lecture.endDate) <= this.today;
  }

  public enrollInLecture() {
    this.enrollmentService.enrollStudent(this.lecture._id).subscribe({
      next: () => {
        console.log('Enrolled successfully!');
        // Reload lecture data to update totalEnrolled
        this.lectureService.getLectureById(this.lecture._id).subscribe({
          next: (updatedLecture) => {
            this.lecture = updatedLecture; // update the local lecture object
            this.alreadyEnrolled();
          },
          error: (err) => {
            console.error('Failed to reload lecture: ' + err.message);
          }
        });
      },
      error: (err) => {
        console.error('Enrollment failed: ' + err.message);
      }
    });
  }

  public alreadyEnrolled(): boolean {
    const storage = JSON.parse(sessionStorage.getItem('currentUser')!);

    let response = false;

    this.enrollmentService.getAlreadyEnrolled(this.lecture._id, storage._id).subscribe({
      next: value => {
        this.enrolled = value;
      }
    });

    return response;
  }

}
