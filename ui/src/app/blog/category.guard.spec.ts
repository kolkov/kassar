import {inject, TestBed} from '@angular/core/testing';

import {CategoryGuard} from './category.guard';

describe('CategoryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryGuard]
    });
  });

  it('should ...', inject([CategoryGuard], (guard: CategoryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
