import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Kassatka10Component } from './kassatka10.component';

describe('Kassatka10Component', () => {
  let component: Kassatka10Component;
  let fixture: ComponentFixture<Kassatka10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Kassatka10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Kassatka10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
