import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannersHomeComponent } from './scanners-home.component';

describe('ScannersHomeComponent', () => {
  let component: ScannersHomeComponent;
  let fixture: ComponentFixture<ScannersHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannersHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
