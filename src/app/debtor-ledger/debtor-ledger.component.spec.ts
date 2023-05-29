import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorLedgerComponent } from './debtor-ledger.component';

describe('DebtorLedgerComponent', () => {
  let component: DebtorLedgerComponent;
  let fixture: ComponentFixture<DebtorLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtorLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
