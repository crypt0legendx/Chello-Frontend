import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTwoComponent } from './list-two.component';

describe('ListTwoComponent', () => {
  let component: ListTwoComponent;
  let fixture: ComponentFixture<ListTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
