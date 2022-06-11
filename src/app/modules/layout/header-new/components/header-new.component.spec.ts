import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNewComponent } from './header-new.component';

describe('HeaderNewComponent', () => {
  let component: HeaderNewComponent;
  let fixture: ComponentFixture<HeaderNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
