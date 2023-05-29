/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFExemptionComponent } from './pfexemption.component';

describe('PFExemptionComponent', () => {
  let component: PFExemptionComponent;
  let fixture: ComponentFixture<PFExemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PFExemptionComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PFExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
