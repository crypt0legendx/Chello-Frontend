import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageThreeComponent } from './message-three.component';

describe('MessageThreeComponent', () => {
  let component: MessageThreeComponent;
  let fixture: ComponentFixture<MessageThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
