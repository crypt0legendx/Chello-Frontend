import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoBlockingComponent } from './geo-blocking.component';

describe('GeoBlockingComponent', () => {
  let component: GeoBlockingComponent;
  let fixture: ComponentFixture<GeoBlockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoBlockingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoBlockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
