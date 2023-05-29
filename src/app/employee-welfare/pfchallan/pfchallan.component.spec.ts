/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFChallanComponent } from './pfchallan.component';

describe('PFChallanComponent', () => {
  let component: PFChallanComponent;
  let fixture: ComponentFixture<PFChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PFChallanComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PFChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
