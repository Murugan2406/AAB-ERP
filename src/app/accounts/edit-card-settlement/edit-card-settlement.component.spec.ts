/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardSettlementComponent } from './edit-card-settlement.component';

describe('EditCardSettlementComponent', () => {
  let component: EditCardSettlementComponent;
  let fixture: ComponentFixture<EditCardSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCardSettlementComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
