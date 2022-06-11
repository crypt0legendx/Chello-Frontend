import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStateComponent } from './page-state.component';

describe('PageStateComponent', () => {
  let component: PageStateComponent;
  let fixture: ComponentFixture<PageStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
