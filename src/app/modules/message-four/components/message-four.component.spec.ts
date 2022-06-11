import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFourComponent } from './message-four.component';

describe('MessageFourComponent', () => {
  let component: MessageFourComponent;
  let fixture: ComponentFixture<MessageFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
