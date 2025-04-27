import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent } from './lectures.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LectureCardComponent } from './lecture-card/lecture-card.component';
import {SharedModule} from '../../shared/shared.module';
import { LectureDetailPanelComponent } from './lecture-detail-panel/lecture-detail-panel.component';
import { ChatbotComponent } from './chatbot/chatbot/chatbot.component';
import {EnrollmentsModule} from '../enrollments/enrollments.module';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { CourseModalComponent } from './teacher-courses/course-modal/course-modal.component';


@NgModule({
  declarations: [
    LecturesComponent,
    LectureCardComponent,
    LectureDetailPanelComponent,
    ChatbotComponent,
    TeacherCoursesComponent,
    CourseModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    EnrollmentsModule
  ],
  exports: [
    LecturesComponent,
    LectureCardComponent
  ]
})
export class LecturesModule { }
