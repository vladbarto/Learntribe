import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollToLectures() {
    this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
