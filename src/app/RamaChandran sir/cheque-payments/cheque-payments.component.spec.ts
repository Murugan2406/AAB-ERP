import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequePaymentsComponent } from './cheque-payments.component';

describe('ChequePaymentsComponent', () => {
  let component: ChequePaymentsComponent;
  let fixture: ComponentFixture<ChequePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
