import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNewComponent } from './group-new.component';

describe('GroupNewComponent', () => {
  let component: GroupNewComponent;
  let fixture: ComponentFixture<GroupNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
