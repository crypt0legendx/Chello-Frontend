import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSixComponent } from './message-six.component';

describe('MessageSixComponent', () => {
  let component: MessageSixComponent;
  let fixture: ComponentFixture<MessageSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
