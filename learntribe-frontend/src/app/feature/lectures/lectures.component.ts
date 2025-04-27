// lectures.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LectureService} from '../../core/service/lecture/lecture.service';
import {LectureModel} from '../../shared/components/model/LectureModel';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/service/auth/auth.service';
import {NavigatingService} from '../../core/service/navigating/navigating.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent implements OnInit {
  lectures: LectureModel[] = [];
  filteredLectures: LectureModel[] = [];
  selectedLecture: LectureModel | null = null;
  isPanelOpen = false;
  dateRangeForm: FormGroup;
  showOffersOnly = false;

  // Domain filter checkboxes (matching the IDs from the HTML)
  domainFilters = [
    { id: 'flexSwitchCheckDefault1', value: 'Low level programming', checked: false },
    { id: 'flexSwitchCheckDefault2', value: 'Programming paradigms', checked: false },
    { id: 'flexSwitchCheckDefault3', value: 'Mathematics', checked: false },
    { id: 'flexSwitchCheckDefault4', value: 'Electronics', checked: false },
    { id: 'flexSwitchCheckDefault5', value: 'Retelistica', checked: false }
  ];

  constructor(
    private fb: FormBuilder,
    private lectureService: LectureService,
    private route: ActivatedRoute,
    public authService: AuthService,
    public navigator: NavigatingService
  ) {
    this.dateRangeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const title = params['title'];
      const filters: any = {};

      if (title) {
        filters.title = title;
      }

      this.loadLectures(filters);
    });

    this.setupDomainFilterListeners();
  }

  loadLectures(params?: any): void {
    this.lectureService.getAll(params).subscribe(
      lectures => {
        this.lectures = lectures;
        this.filteredLectures = lectures;
      },
      error => console.error('Error loading lectures:', error)
    );
  }

  // Set up event listeners for existing domain filter checkboxes
  setupDomainFilterListeners(): void {
    this.domainFilters.forEach(domain => {
      const checkbox = document.getElementById(domain.id) as HTMLInputElement;
      if (checkbox) {
        checkbox.addEventListener('change', (event) => {
          const target = event.target as HTMLInputElement;
          domain.checked = target.checked;
          this.applyFilters();
        });
      }
    });

    // Set up offers filter listener
    const offersCheckbox = document.getElementById('defaultCheck1') as HTMLInputElement;
    if (offersCheckbox) {
      offersCheckbox.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        this.showOffersOnly = target.checked;
        this.applyFilters();
      });
    }
  }

  showLectureDetails(lecture: LectureModel): void {
    this.selectedLecture = lecture;
    this.isPanelOpen = true;
  }

  closePanel(): void {
    this.isPanelOpen = false;
  }

  filterLectures(): void {
    if (this.dateRangeForm.valid) {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    const params: any = {};

    // Date filters if needed (though not used in backend currently)
    const startDate = this.dateRangeForm.get('startDate')?.value;
    const endDate = this.dateRangeForm.get('endDate')?.value;

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    // Send only the first selected domain (since backend expects single domain string)
    const selectedDomain = this.domainFilters.find(domain => domain.checked);
    if (selectedDomain) {
      params.domain = selectedDomain.value;
    }

    // Only add the offer value if the checkbox is enabled
    if (this.showOffersOnly) {
      params.offer = true; // Or whatever value indicates an offer (match what's in DB)
    }

    // NO language param is sent anymore
    this.lectureService.getAll(params).subscribe(
      lectures => {
        this.filteredLectures = lectures;
      },
      error => console.error('Error filtering lectures:', error)
    );
  }


  resetFilter(): void {
    this.dateRangeForm.reset();

    // Reset domain checkboxes in the UI
    this.domainFilters.forEach(domain => {
      domain.checked = false;
      const checkbox = document.getElementById(domain.id) as HTMLInputElement;
      if (checkbox) checkbox.checked = false;
    });


    // Reset offers checkbox
    this.showOffersOnly = false;
    const offersCheckbox = document.getElementById('defaultCheck1') as HTMLInputElement;
    if (offersCheckbox) offersCheckbox.checked = false;

    this.loadLectures();
  }

}
