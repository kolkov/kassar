import {inject, TestBed} from '@angular/core/testing';
import {CatalogGuard} from "./catalog/catalog.guard";


describe('CatalogGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogGuard]
    });
  });

  it('should ...', inject([CatalogGuard], (guard: CatalogGuard) => {
    expect(guard).toBeTruthy();
  }));
});
