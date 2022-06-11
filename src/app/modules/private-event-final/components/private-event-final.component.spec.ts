import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateEventFinalComponent } from './private-event-final.component';

describe('PrivateEventFinalComponent', () => {
  let component: PrivateEventFinalComponent;
  let fixture: ComponentFixture<PrivateEventFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateEventFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateEventFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
