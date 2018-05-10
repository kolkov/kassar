import { TestBed, inject } from '@angular/core/testing';

import { AdditionalOptionsService } from './additional-options.service';

describe('AdditionalOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalOptionsService]
    });
  });

  it('should be created', inject([AdditionalOptionsService], (service: AdditionalOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
