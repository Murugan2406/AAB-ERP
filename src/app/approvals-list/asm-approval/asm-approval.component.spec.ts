import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmApprovalComponent } from './asm-approval.component';

describe('AsmApprovalComponent', () => {
  let component: AsmApprovalComponent;
  let fixture: ComponentFixture<AsmApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsmApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
