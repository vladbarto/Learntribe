import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../core/service/lecture/lecture.service';
import { AuthService } from '../../../core/service/auth/auth.service';
import { LectureModel } from '../../../shared/components/model/LectureModel';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  courses: LectureModel[] = [];
  showCourseModal = false;
  editingCourse: LectureModel | null = null;

  constructor(
    private lectureService: LectureService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.refreshCourses();
  }

  refreshCourses(): void {
    const teacherId = this.authService.getUserId();
    this.lectureService.getLecturesByTeacher(teacherId).subscribe({
      next: (courses) => this.courses = courses,
      error: (err) => console.error('Failed to load courses:', err.message)
    });
  }

  openAddModal(): void {
    this.editingCourse = null;
    this.showCourseModal = true;
  }

  openEditModal(course: LectureModel): void {
    this.editingCourse = course;
    this.showCourseModal = true;
  }

  closeCourseModal(): void {
    this.showCourseModal = false;
  }

  saveCourse(course: LectureModel): void {
    if (course._id) {
      // Existing course → update (PUT)
      this.lectureService.updateLecture(course._id, course).subscribe({
        next: () => this.refreshCourses(),
        error: (err) => console.error('Failed to update course:', err.message)
      });
    } else {
      // New course → create (POST)
      const teacherId = this.authService.getUserId(); // <-- get teacher ID
      this.lectureService.createLecture({ ...course, teacherId }).subscribe({
        next: () => this.refreshCourses(),
        error: (err) => console.error('Failed to create course:', err.message)
      });
    }
    this.closeCourseModal();
  }


  deleteCourse(courseId: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.lectureService.deleteLecture(courseId).subscribe({
        next: () => this.refreshCourses(),
        error: (err) => console.error('Failed to delete course:', err.message)
      });
    }
  }
}
