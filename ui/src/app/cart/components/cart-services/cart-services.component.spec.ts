import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartServicesComponent} from './cart-services.component';

describe('CartServicesComponent', () => {
  let component: CartServicesComponent;
  let fixture: ComponentFixture<CartServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
