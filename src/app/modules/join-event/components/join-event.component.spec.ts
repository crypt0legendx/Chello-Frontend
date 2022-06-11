import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinEventComponent } from './join-event.component';

describe('JoinEventComponent', () => {
  let component: JoinEventComponent;
  let fixture: ComponentFixture<JoinEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
