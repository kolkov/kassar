import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KktHomeComponent } from './kkt-home.component';

describe('KktHomeComponent', () => {
  let component: KktHomeComponent;
  let fixture: ComponentFixture<KktHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KktHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KktHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
