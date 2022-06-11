import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsPolicyComponent } from './complaints-policy.component';

describe('ComplaintsPolicyComponent', () => {
  let component: ComplaintsPolicyComponent;
  let fixture: ComponentFixture<ComplaintsPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
