import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KktComponent } from './kkt.component';

describe('KktComponent', () => {
  let component: KktComponent;
  let fixture: ComponentFixture<KktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
