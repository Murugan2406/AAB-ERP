/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcoutComponent } from './dcout.component';

describe('DcoutComponent', () => {
  let component: DcoutComponent;
  let fixture: ComponentFixture<DcoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DcoutComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
