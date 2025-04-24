import {Component, Input} from '@angular/core';
import {LectureModel} from '../../../shared/components/model/LectureModel';
import {AuthService} from '../../../core/service/auth/auth.service';
import {LectureService} from '../../../core/service/lecture/lecture.service';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrl: './lecture-card.component.css'
})
export class LectureCardComponent {
  @Input() lecture!: LectureModel;
  today = new Date();

  constructor(
    public authService: AuthService,
    public lectureService: LectureService
  ) {
  }

  protected readonly AuthService = AuthService;

  public hasLectureEnded(): boolean {
    return new Date(this.lecture.endDate) <= this.today;
  }
}
