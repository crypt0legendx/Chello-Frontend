import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayComponent } from './event-play.component';

describe('EventPlayComponent', () => {
  let component: EventPlayComponent;
  let fixture: ComponentFixture<EventPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
