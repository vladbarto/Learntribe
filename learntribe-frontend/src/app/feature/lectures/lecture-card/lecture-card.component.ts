import {Component, Input} from '@angular/core';
import {LectureModel} from '../../../shared/components/model/LectureModel';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrl: './lecture-card.component.css'
})
export class LectureCardComponent {
  @Input() lecture!: LectureModel;
}
