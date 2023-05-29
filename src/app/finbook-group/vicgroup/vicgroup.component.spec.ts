/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VICGroupComponent } from './vicgroup.component';

describe('VICGroupComponent', () => {
  let component: VICGroupComponent;
  let fixture: ComponentFixture<VICGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VICGroupComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VICGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
