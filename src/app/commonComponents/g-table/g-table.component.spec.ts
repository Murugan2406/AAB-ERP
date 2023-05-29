/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GTableComponent } from './g-table.component';

describe('GTableComponent', () => {
  let component: GTableComponent;
  let fixture: ComponentFixture<GTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GTableComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
