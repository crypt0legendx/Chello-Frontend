import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPostListComponent } from './group-post-list.component';

describe('GroupPostListComponent', () => {
  let component: GroupPostListComponent;
  let fixture: ComponentFixture<GroupPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
