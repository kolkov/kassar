import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KassatkaMiniComponent } from './kassatka-mini.component';

describe('KassatkaMiniComponent', () => {
  let component: KassatkaMiniComponent;
  let fixture: ComponentFixture<KassatkaMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KassatkaMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KassatkaMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
