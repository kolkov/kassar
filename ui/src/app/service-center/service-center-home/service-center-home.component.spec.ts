import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCenterHomeComponent } from './service-center-home.component';

describe('ServiceCenterHomeComponent', () => {
  let component: ServiceCenterHomeComponent;
  let fixture: ComponentFixture<ServiceCenterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCenterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
