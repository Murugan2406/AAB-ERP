import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrticketReportsComponent } from './brticket-reports.component';

describe('BrticketReportsComponent', () => {
  let component: BrticketReportsComponent;
  let fixture: ComponentFixture<BrticketReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrticketReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrticketReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
