import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UscComponent } from './usc.component';

describe('UscComponent', () => {
  let component: UscComponent;
  let fixture: ComponentFixture<UscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
