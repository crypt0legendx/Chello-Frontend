import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAskPostComponent } from './poll-ask-post.component';

describe('PollAskPostComponent', () => {
  let component: PollAskPostComponent;
  let fixture: ComponentFixture<PollAskPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollAskPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAskPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
