import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAskComponent } from './poll-ask.component';

describe('PollAskComponent', () => {
  let component: PollAskComponent;
  let fixture: ComponentFixture<PollAskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollAskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
