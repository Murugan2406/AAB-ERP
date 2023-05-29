/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A2bSharedComponent } from './a2b-shared.component';

describe('A2bSharedComponent', () => {
  let component: A2bSharedComponent;
  let fixture: ComponentFixture<A2bSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [A2bSharedComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(A2bSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
