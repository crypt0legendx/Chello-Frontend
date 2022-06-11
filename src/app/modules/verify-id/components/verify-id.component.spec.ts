import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIdComponent } from './verify-id.component';

describe('VerifyIdComponent', () => {
  let component: VerifyIdComponent;
  let fixture: ComponentFixture<VerifyIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
