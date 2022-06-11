import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFiveComponent } from './message-five.component';

describe('MessageFiveComponent', () => {
  let component: MessageFiveComponent;
  let fixture: ComponentFixture<MessageFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
