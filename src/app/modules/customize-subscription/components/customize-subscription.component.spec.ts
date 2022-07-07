import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeSubscriptionComponent } from './customize-subscription.component';

describe('CustomizeSubscriptionComponent', () => {
  let component: CustomizeSubscriptionComponent;
  let fixture: ComponentFixture<CustomizeSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
