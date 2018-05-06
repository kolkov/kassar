import { TestBed, inject } from '@angular/core/testing';

import { YandexMetrikaService } from './yandex-metrika.service';

describe('YandexMetrikaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YandexMetrikaService]
    });
  });

  it('should be created', inject([YandexMetrikaService], (service: YandexMetrikaService) => {
    expect(service).toBeTruthy();
  }));
});
