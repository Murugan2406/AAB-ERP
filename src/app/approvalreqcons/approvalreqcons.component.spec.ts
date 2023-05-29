import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovalreqconsComponent } from './approvalreqcons.component';

describe('ApprovalreqconsComponent', () => {
  let component: ApprovalreqconsComponent;
  let fixture: ComponentFixture<ApprovalreqconsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalreqconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalreqconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
