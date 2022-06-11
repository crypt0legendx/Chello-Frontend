import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVaultComponent } from './profile-vault.component';

describe('ProfileVaultComponent', () => {
  let component: ProfileVaultComponent;
  let fixture: ComponentFixture<ProfileVaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
