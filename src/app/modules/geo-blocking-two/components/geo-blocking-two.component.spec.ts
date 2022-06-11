import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoBlockingTwoComponent } from './geo-blocking-two.component';

describe('GeoBlockingTwoComponent', () => {
  let component: GeoBlockingTwoComponent;
  let fixture: ComponentFixture<GeoBlockingTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoBlockingTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoBlockingTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
