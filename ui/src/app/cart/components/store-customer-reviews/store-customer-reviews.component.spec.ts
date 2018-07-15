import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCustomerReviewsComponent } from './store-customer-reviews.component';

describe('StoreCustomerReviewsComponent', () => {
  let component: StoreCustomerReviewsComponent;
  let fixture: ComponentFixture<StoreCustomerReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCustomerReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCustomerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
