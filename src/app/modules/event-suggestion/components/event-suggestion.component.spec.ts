import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSuggestionComponent } from './event-suggestion.component';

describe('EventSuggestionComponent', () => {
  let component: EventSuggestionComponent;
  let fixture: ComponentFixture<EventSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
