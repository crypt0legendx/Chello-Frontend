import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptableUseComponent } from './acceptable-use.component';

describe('AcceptableUseComponent', () => {
  let component: AcceptableUseComponent;
  let fixture: ComponentFixture<AcceptableUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptableUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptableUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
