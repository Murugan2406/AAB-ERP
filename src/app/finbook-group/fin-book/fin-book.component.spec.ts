/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinBookComponent } from './fin-book.component';

describe('FinBookComponent', () => {
  let component: FinBookComponent;
  let fixture: ComponentFixture<FinBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinBookComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
