import {inject, TestBed} from '@angular/core/testing';

import {CartHomeService} from './cart-home.service';

describe('CartHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartHomeService]
    });
  });

  it('should be created', inject([CartHomeService], (service: CartHomeService) => {
    expect(service).toBeTruthy();
  }));
});
