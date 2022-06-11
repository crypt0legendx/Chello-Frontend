import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaComponent } from './dmca.component';

describe('DmcaComponent', () => {
  let component: DmcaComponent;
  let fixture: ComponentFixture<DmcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
