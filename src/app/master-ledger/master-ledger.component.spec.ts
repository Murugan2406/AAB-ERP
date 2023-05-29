/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLedgerComponent } from './master-ledger.component';

describe('MasterLedgerComponent', () => {
  let component: MasterLedgerComponent;
  let fixture: ComponentFixture<MasterLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterLedgerComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
