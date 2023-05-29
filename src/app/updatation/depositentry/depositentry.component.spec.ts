import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositentryComponent } from './depositentry.component';

describe('DepositentryComponent', () => {
  let component: DepositentryComponent;
  let fixture: ComponentFixture<DepositentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
