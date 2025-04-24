import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent } from './lectures.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LectureCardComponent } from './lecture-card/lecture-card.component';
import {SharedModule} from '../../shared/shared.module';
import { LectureDetailPanelComponent } from './lecture-detail-panel/lecture-detail-panel.component';
import { ChatbotComponent } from './chatbot/chatbot/chatbot.component';


@NgModule({
  declarations: [
    LecturesComponent,
    LectureCardComponent,
    LectureDetailPanelComponent,
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    LecturesComponent,
    LectureCardComponent
  ]
})
export class LecturesModule { }
