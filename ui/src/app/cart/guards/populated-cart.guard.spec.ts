import { TestBed, async, inject } from '@angular/core/testing';

import { PopulatedCartGuard } from './populated-cart.guard';

describe('PopulatedCartGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopulatedCartGuard]
    });
  });

  it('should ...', inject([PopulatedCartGuard], (guard: PopulatedCartGuard) => {
    expect(guard).toBeTruthy();
  }));
});
