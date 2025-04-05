import { TestBed } from '@angular/core/testing';

import { NavigatingService } from './navigating.service';

describe('NavigatingService', () => {
  let service: NavigatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
