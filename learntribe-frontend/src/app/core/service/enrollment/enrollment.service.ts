import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {UserModel} from '../../../shared/components/model/UserModel';
import {EnrollmentModel} from '../../../shared/components/model/EnrollmentModel';
import {AuthService} from '../auth/auth.service';
import {LectureService} from '../lecture/lecture.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  baseUrl: string = environment.endpoint.ENROLLMENT.base; // /enrollments
  enroll: string = environment.endpoint.ENROLLMENT.enroll; // /enroll
  alreadyEnrolled: string = environment.endpoint.ENROLLMENT.alreadyEnrolled; // /already-enrolled

  constructor(private http: HttpClient, private authService: AuthService, private lectureService: LectureService) {}

  enrollStudent(lectureId: string) {
    const enrollmentDate = new Date();
     const enrollmentRequest: EnrollmentModel = {
      lectureId: lectureId,
      userId: this.getCurrentUserId(),
      enrollmentDate: enrollmentDate
    }
    console.log(enrollmentRequest);
    this.lectureService.incrementLectureTotalEnrolled(lectureId).subscribe();
    return this.http.post(`${this.baseUrl}/${this.enroll}`, enrollmentRequest);
  }

  private retrieveCurrentUser(): UserModel {
    if(this.authService.isLoggedIn()) {
      return JSON.parse(sessionStorage.getItem('currentUser')!);
    }
    return {
      username: '', password: '', _id: 'some id', email: '', surname: '', name: '', role: ''
    };
  }

  private getCurrentUserId(): string {
    return this.retrieveCurrentUser()._id!;
  }

  public getAlreadyEnrolled(lectureId: string, userId: string) {
    return this.http.get<boolean>(`${this.baseUrl}/${this.alreadyEnrolled}/${lectureId}/${userId}`);
  }
}
