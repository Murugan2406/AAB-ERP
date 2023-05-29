import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOnACCBalanceComponent } from './cust-on-accbalance.component';

describe('CustOnACCBalanceComponent', () => {
  let component: CustOnACCBalanceComponent;
  let fixture: ComponentFixture<CustOnACCBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOnACCBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustOnACCBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
