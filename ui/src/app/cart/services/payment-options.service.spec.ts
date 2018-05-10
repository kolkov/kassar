import { TestBed, inject } from '@angular/core/testing';

import { PaymentOptionsService } from './payment-options.service';

describe('PaymentOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentOptionsService]
    });
  });

  it('should be created', inject([PaymentOptionsService], (service: PaymentOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
