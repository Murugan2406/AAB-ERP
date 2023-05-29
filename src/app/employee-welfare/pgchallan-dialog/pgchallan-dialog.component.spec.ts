/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PGChallanDialogComponent } from './pgchallan-dialog.component';

describe('PGChallanDialogComponent', () => {
  let component: PGChallanDialogComponent;
  let fixture: ComponentFixture<PGChallanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PGChallanDialogComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PGChallanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
