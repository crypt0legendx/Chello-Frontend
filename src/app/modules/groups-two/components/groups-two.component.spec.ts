import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsTwoComponent } from './groups-two.component';

describe('GroupsTwoComponent', () => {
  let component: GroupsTwoComponent;
  let fixture: ComponentFixture<GroupsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
