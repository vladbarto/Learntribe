import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lecture-detail-panel',
  templateUrl: './lecture-detail-panel.component.html',
  styleUrls: ['./lecture-detail-panel.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out'))
    ])
  ]
})
export class LectureDetailPanelComponent {
  @Input() lecture: any;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closePanel(): void {
    this.close.emit();
  }
}
