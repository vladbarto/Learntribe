import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LectureModel } from '../../../../shared/components/model/LectureModel';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {
  @Input() lecture: LectureModel | null = null;
  @Output() saved = new EventEmitter<LectureModel>();
  @Output() closed = new EventEmitter<void>();

  formData: LectureModel = {
    title: '',
    description: '',
    domain: '',
    startDate: new Date(),
    endDate: new Date(),
    price: 0,
    offer: 0,
    languages: [],
    totalPlaces: 0,
    totalEnrolled: 0,
    numberOfSessions: 0,
    isAvailable: true,
    teacherId: ''
  };

  ngOnInit(): void {
    if (this.lecture) {
      this.formData = { ...this.lecture };
    }
  }

  onSave(): void {
    this.saved.emit(this.formData);
  }

  onCancel(): void {
    this.closed.emit();
  }
}
