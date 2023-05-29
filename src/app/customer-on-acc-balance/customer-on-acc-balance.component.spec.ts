/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnAccBalanceComponent } from './customer-on-acc-balance.component';

describe('CustomerOnAccBalanceComponent', () => {
  let component: CustomerOnAccBalanceComponent;
  let fixture: ComponentFixture<CustomerOnAccBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOnAccBalanceComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnAccBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
