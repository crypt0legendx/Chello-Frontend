import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEarningComponent } from './profile-earning.component';

describe('ProfileEarningComponent', () => {
  let component: ProfileEarningComponent;
  let fixture: ComponentFixture<ProfileEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
