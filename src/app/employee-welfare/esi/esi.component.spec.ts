/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESIComponent } from './esi.component';

describe('ESIComponent', () => {
  let component: ESIComponent;
  let fixture: ComponentFixture<ESIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ESIComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
