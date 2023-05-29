/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COABalanceComponent } from './coabalance.component';

describe('COABalanceComponent', () => {
  let component: COABalanceComponent;
  let fixture: ComponentFixture<COABalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [COABalanceComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(COABalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
