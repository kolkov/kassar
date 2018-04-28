import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Kassatka7Component } from './kassatka7.component';

describe('Kassatka7Component', () => {
  let component: Kassatka7Component;
  let fixture: ComponentFixture<Kassatka7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Kassatka7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Kassatka7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
