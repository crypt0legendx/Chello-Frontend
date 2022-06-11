import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawEarningOneComponent } from './withdraw-earning-one.component';

describe('WithdrawEarningOneComponent', () => {
  let component: WithdrawEarningOneComponent;
  let fixture: ComponentFixture<WithdrawEarningOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawEarningOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawEarningOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
