import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OnlajnKassyComponent} from './onlajn-kassy.component';

describe('OnlajnKassyComponent', () => {
  let component: OnlajnKassyComponent;
  let fixture: ComponentFixture<OnlajnKassyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnlajnKassyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlajnKassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
