import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreQuestionAnswerComponent } from './store-question-answer.component';

describe('StoreQuestionAnswerComponent', () => {
  let component: StoreQuestionAnswerComponent;
  let fixture: ComponentFixture<StoreQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
