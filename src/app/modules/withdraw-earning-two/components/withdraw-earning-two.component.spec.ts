import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawEarningTwoComponent } from './withdraw-earning-two.component';

describe('WithdrawEarningTwoComponent', () => {
  let component: WithdrawEarningTwoComponent;
  let fixture: ComponentFixture<WithdrawEarningTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawEarningTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawEarningTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
