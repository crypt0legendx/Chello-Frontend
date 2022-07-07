import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIdTwoComponent } from './verify-id-two.component';

describe('VerifyIdTwoComponent', () => {
  let component: VerifyIdTwoComponent;
  let fixture: ComponentFixture<VerifyIdTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyIdTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyIdTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
