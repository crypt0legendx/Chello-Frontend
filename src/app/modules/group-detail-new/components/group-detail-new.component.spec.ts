import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailNewComponent } from './group-detail-new.component';

describe('GroupDetailNewComponent', () => {
  let component: GroupDetailNewComponent;
  let fixture: ComponentFixture<GroupDetailNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDetailNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
