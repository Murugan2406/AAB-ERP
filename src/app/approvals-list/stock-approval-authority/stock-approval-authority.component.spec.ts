import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockApprovalAuthorityComponent } from './stock-approval-authority.component';

describe('StockApprovalAuthorityComponent', () => {
  let component: StockApprovalAuthorityComponent;
  let fixture: ComponentFixture<StockApprovalAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockApprovalAuthorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockApprovalAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
