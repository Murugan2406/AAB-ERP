import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWeekoffComponent } from './employee-weekoff.component';

describe('EmployeeWeekoffComponent', () => {
  let component: EmployeeWeekoffComponent;
  let fixture: ComponentFixture<EmployeeWeekoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWeekoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWeekoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
