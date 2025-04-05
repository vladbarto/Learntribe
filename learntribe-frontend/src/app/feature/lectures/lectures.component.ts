import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent implements OnInit {
  dateRangeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  filterLectures(): void {
    if (this.dateRangeForm.valid) {
      // @ts-ignore
      const startDate = this.dateRangeForm.get('startDate').value;
      // @ts-ignore
      const endDate = this.dateRangeForm.get('endDate').value;
      console.log('Filtering lectures between:', { startDate, endDate });
      // Here you would implement your filtering logic
    }
  }

  resetFilter(): void {
    this.dateRangeForm.reset();
    // Reset any applied filters here
  }
  // -------------------
  lectures = [
    {
      id: 1,
      title: 'Introduction to Angular',
      date: new Date('2025-04-01'),
      instructor: 'Jane Doe',
      description: 'An overview of Angular framework and its core concepts.',
      resources: [
        { title: 'Slides', url: '/assets/slides/intro.pdf' },
        { title: 'Sample Code', url: 'https://github.com/example/angular-intro' }
      ]
    },
    // Add more lectures...
  ];

  selectedLecture: any = null;
  isPanelOpen = false;

  showLectureDetails(lecture: any): void {
    this.selectedLecture = lecture;
    this.isPanelOpen = true;
  }

  closePanel(): void {
    this.isPanelOpen = false;
  }
}
