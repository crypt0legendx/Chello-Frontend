import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDetailComponent } from './groups-detail.component';

describe('GroupsDetailComponent', () => {
  let component: GroupsDetailComponent;
  let fixture: ComponentFixture<GroupsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
