import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawEarningThreeComponent } from './withdraw-earning-three.component';

describe('WithdrawEarningThreeComponent', () => {
  let component: WithdrawEarningThreeComponent;
  let fixture: ComponentFixture<WithdrawEarningThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawEarningThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawEarningThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
