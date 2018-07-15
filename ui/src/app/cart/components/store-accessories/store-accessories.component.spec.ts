import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAccessoriesComponent } from './store-accessories.component';

describe('StoreAccessoriesComponent', () => {
  let component: StoreAccessoriesComponent;
  let fixture: ComponentFixture<StoreAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
