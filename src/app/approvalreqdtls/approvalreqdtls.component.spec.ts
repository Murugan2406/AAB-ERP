import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovalreqdtlsComponent } from './approvalreqdtls.component';

describe('ApprovalreqdtlsComponent', () => {
  let component: ApprovalreqdtlsComponent;
  let fixture: ComponentFixture<ApprovalreqdtlsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalreqdtlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalreqdtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
