import { TestBed, inject } from '@angular/core/testing';

import { RelativeService } from './relative.service';

describe('RelativeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelativeService]
    });
  });

  it('should be created', inject([RelativeService], (service: RelativeService) => {
    expect(service).toBeTruthy();
  }));
});
