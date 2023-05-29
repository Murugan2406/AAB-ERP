import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingInformationComponent } from './accounting-information.component';

describe('AccountingInformationComponent', () => {
  let component: AccountingInformationComponent;
  let fixture: ComponentFixture<AccountingInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
