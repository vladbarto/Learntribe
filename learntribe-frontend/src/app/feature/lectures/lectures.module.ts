import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent } from './lectures.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LectureCardComponent } from './lecture-card/lecture-card.component';
import {SharedModule} from '../../shared/shared.module';
import { LectureDetailPanelComponent } from './lecture-detail-panel/lecture-detail-panel.component';


@NgModule({
  declarations: [
    LecturesComponent,
    LectureCardComponent,
    LectureDetailPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LecturesComponent,
    LectureCardComponent
  ]
})
export class LecturesModule { }
